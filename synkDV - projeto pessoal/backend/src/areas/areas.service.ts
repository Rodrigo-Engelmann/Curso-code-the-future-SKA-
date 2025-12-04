import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Areas } from './areas.entity';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Areas)
    private readonly areasRepository: Repository<Areas>,
  ) {}

  // CREATE
  async register(areaData: Partial<Areas>): Promise<Areas> {
    const area = this.areasRepository.create(areaData);
    return await this.areasRepository.save(area);
  }

  // GET ALL
  async findAll(): Promise<Areas[]> {
    return await this.areasRepository.find({
      relations: ['team', 'files', 'milestones'],
    });
  }

  // GET BY ID
  async findById(id: number): Promise<Areas> {
    const area = await this.areasRepository.findOne({
      where: { id },
      relations: ['team', 'files', 'milestones'],
    });

    if (!area) {
      throw new NotFoundException('Área não encontrada');
    }

    return area;
  }

  // UPDATE
  async update(id: number, updateData: Partial<Areas>): Promise<Areas> {
    const area = await this.findById(id);

    Object.assign(area, updateData);

    return await this.areasRepository.save(area);
  }

  // DELETE
  async delete(id: number) {
    const area = await this.findById(id);

    await this.areasRepository.remove(area);

    return { message: 'Área removida com sucesso' };
  }
}
