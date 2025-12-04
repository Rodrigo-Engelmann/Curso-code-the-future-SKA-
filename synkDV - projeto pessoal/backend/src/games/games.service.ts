import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Games } from './games.entity';

@Injectable()
export class GamesService {
    constructor(
        @InjectRepository(Games)
        private readonly gamesRepository: Repository<Games>,
    ) {}

    // ROTA CREATE (REGISTER)
    async register(gameData: Partial<Games>): Promise<Games> {
        const game = this.gamesRepository.create(gameData);
        return await this.gamesRepository.save(game);
    }

    // ROTA GET ALL
    async findAll(): Promise<Games[]> {
        return await this.gamesRepository.find({
            relations: ['games'],
        });
    }

    // ROTA GET BY ID
    async findById(id: number): Promise<Games> {
        const game = await this.gamesRepository.findOne({
            where: { id },
            relations: ['games'],
        });

        if (!game) {
            throw new NotFoundException('Jogo não encontrado');
        }

        return game;
    }

    // ROTA EDIT / UPDATE
    async update(id: number, updateData: Partial<Games>): Promise<Games> {
        const game = await this.findById(id);

        Object.assign(game, updateData);

        return await this.gamesRepository.save(game);
    }

    // ROTA DELETE
    async delete(id: number) {
        const game = await this.findById(id);

        await this.gamesRepository.remove(game);

        return { message: 'Jogo removido com sucesso' };
    }
}
