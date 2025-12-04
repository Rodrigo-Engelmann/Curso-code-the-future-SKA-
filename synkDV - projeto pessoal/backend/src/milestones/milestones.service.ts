import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Milestones } from './milestones.entity';

@Injectable()
export class MilestonesService {
    constructor(
        @InjectRepository(Milestones)
        private readonly milestonesRepository: Repository<Milestones>,
    ) {}

    // ROTA CREATE (REGISTER)
    async register(milestoneData: Partial<Milestones>): Promise<Milestones> {
        const milestone = this.milestonesRepository.create(milestoneData);
        return await this.milestonesRepository.save(milestone);
    }

    // ROTA GET ALL
    async findAll(): Promise<Milestones[]> {
        return await this.milestonesRepository.find({
            relations: ['tasks', 'areas'],
        });
    }

    // ROTA GET BY ID
    async findById(id: number): Promise<Milestones> {
        const milestone = await this.milestonesRepository.findOne({
            where: { id },
            relations: ['tasks', 'areas'],
        });

        if (!milestone) {
            throw new NotFoundException('Milestone não encontrada');
        }

        return milestone;
    }

    // ROTA EDIT / UPDATE
    async update(id: number, updateData: Partial<Milestones>): Promise<Milestones> {
        const milestone = await this.findById(id);

        Object.assign(milestone, updateData);

        return await this.milestonesRepository.save(milestone);
    }

    // ROTA DELETE
    async delete(id: number) {
        const milestone = await this.findById(id);

        await this.milestonesRepository.remove(milestone);

        return { message: 'Milestone removida com sucesso' };
    }
}
