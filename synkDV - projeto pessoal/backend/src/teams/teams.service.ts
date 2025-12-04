import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teams } from './teams.entity';
import { User } from '../users/user.entity'

@Injectable()
export class TeamsService {
    constructor(
        @InjectRepository(Teams)
        private readonly teamsRepository: Repository<Teams>,

        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    // ROTA CREATE (REGISTER)
    async register(teamData: Partial<Teams>): Promise<Teams> {
        const team = this.teamsRepository.create(teamData);
        return await this.teamsRepository.save(team);
    }

    // ROTA GET ALL
    async findAll(): Promise<Teams[]> {
        return await this.teamsRepository.find({
            relations: ['users', 'games', 'areas'],
        });
    }

    // ROTA GET BY ID
    async findById(id: number): Promise<Teams> {
        const team = await this.teamsRepository.findOne({
            where: { id },
            relations: ['users', 'games', 'areas'],
        });

        if (!team) {
            throw new NotFoundException('Time não encontrado');
        }

        return team;
    }

    // ROTA EDIT / UPDATE
    async update(id: number, updateData: Partial<Teams>): Promise<Teams> {
        const team = await this.findById(id);

        Object.assign(team, updateData);

        return await this.teamsRepository.save(team);
    }

    // ROTA DELETE
    async delete(id: number) {
        const team = await this.findById(id);

        await this.teamsRepository.remove(team);

        return { message: 'Time removido com sucesso' };
    }

    async removeUserFromTeam(teamId: number, userId: number) {
        const team = await this.teamsRepository.findOne({
            where: { id: teamId },
            relations: ['users']
        });

        if (!team) throw new Error('Time não encontrado');

        // Remove o usuário apenas da relação
        team.users = team.users.filter(user => user.id !== userId);

        // Salva a alteração na tabela de junção
        await this.teamsRepository.save(team);

        return team;
    }


    async addUserToTeam(teamId: number, userId: number) {
        const team = await this.teamsRepository.findOne({
            where: { id: teamId },
            relations: ['users'],
        });

        if (!team) throw new NotFoundException('Time não encontrado');

        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('Usuário não encontrado');

        // evita duplicados
        if (team.users.some(u => u.id === userId)) {
            return team; // já está no time
        }

        team.users.push(user);

        return this.teamsRepository.save(team);
    }

}
