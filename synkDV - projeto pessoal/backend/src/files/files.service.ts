import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Files } from './files.entity';

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(Files)
        private readonly filesRepository: Repository<Files>,
    ) {}

    // ROTA CREATE (REGISTER)
    async register(fileData: Partial<Files>): Promise<Files> {
        const file = this.filesRepository.create(fileData);
        return await this.filesRepository.save(file);
    }

    // ROTA GET ALL
    async findAll(): Promise<Files[]> {
        return await this.filesRepository.find({
            relations: ['areas'],
        });
    }

    // ROTA GET BY ID
    async findById(id: number): Promise<Files> {
        const file = await this.filesRepository.findOne({
            where: { id },
            relations: ['areas'],
        });

        if (!file) {
            throw new NotFoundException('Time não encontrado');
        }

        return file;
    }

    // ROTA EDIT / UPDATE
    async update(id: number, updateData: Partial<Files>): Promise<Files> {
        const file = await this.findById(id);

        Object.assign(file, updateData);

        return await this.filesRepository.save(file);
    }

    // ROTA DELETE
    async delete(id: number) {
        const file = await this.findById(id);

        await this.filesRepository.remove(file);

        return { message: 'Time removido com sucesso' };
    }
}
