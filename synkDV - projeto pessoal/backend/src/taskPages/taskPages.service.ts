import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskPages } from './taskPages.entity';

@Injectable()
export class TaskPagesService {
    constructor(
        @InjectRepository(TaskPages)
        private readonly taskPagesRepository: Repository<TaskPages>,
    ) {}

    // ROTA CREATE (REGISTER)
    async register(taskPagesData: Partial<TaskPages>): Promise<TaskPages> {
        const taskPages = this.taskPagesRepository.create(taskPagesData);
        return await this.taskPagesRepository.save(taskPages);
    }

    // ROTA GET ALL
    async findAll(): Promise<TaskPages[]> {
        return await this.taskPagesRepository.find({
            relations: ['milestones'],
        });
    }

    // ROTA GET BY ID
    async findById(id: number): Promise<TaskPages> {
        const taskPages = await this.taskPagesRepository.findOne({
            where: { id },
            relations: ['milestones'],
        });

        if (!taskPages) {
            throw new NotFoundException('Página de tarefas não encontrado');
        }

        return taskPages;
    }

    // ROTA EDIT / UPDATE
    async update(id: number, updateData: Partial<TaskPages>): Promise<TaskPages> {
        const taskPages = await this.findById(id);

        Object.assign(taskPages, updateData);

        return await this.taskPagesRepository.save(taskPages);
    }

    // ROTA DELETE
    async delete(id: number) {
        const taskPages = await this.findById(id);

        await this.taskPagesRepository.remove(taskPages);

        return { message: 'Página de tarefas removida com sucesso' };
    }
}
