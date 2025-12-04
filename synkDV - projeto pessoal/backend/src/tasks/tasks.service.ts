import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tasks } from './tasks.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Tasks)
        private readonly TasksRepository: Repository<Tasks>,
    ) {}

    // ROTA CREATE (REGISTER)
    async register(taskData: Partial<Tasks>): Promise<Tasks> {
        const task = this.TasksRepository.create(taskData);
        return await this.TasksRepository.save(task);
    }

    // ROTA GET ALL
    async findAll(): Promise<Tasks[]> {
        return await this.TasksRepository.find({
            relations: ['milestones'],
        });
    }

    // ROTA GET BY ID
    async findById(id: number): Promise<Tasks> {
        const task = await this.TasksRepository.findOne({
            where: { id },
            relations: ['milestones'],
        });

        if (!task) {
            throw new NotFoundException('Tarefa não encontrado');
        }

        return task;
    }

    // ROTA EDIT / UPDATE
    async update(id: number, updateData: Partial<Tasks>): Promise<Tasks> {
        const task = await this.findById(id);

        Object.assign(task, updateData);

        return await this.TasksRepository.save(task);
    }

    // ROTA DELETE
    async delete(id: number) {
        const task = await this.findById(id);

        await this.TasksRepository.remove(task);

        return { message: 'Tarefa removido com sucesso' };
    }
}
