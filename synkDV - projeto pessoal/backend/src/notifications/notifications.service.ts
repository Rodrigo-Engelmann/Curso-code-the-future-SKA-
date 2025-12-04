import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notifications } from './notifications.entity';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(Notifications)
        private readonly notificationsRepository: Repository<Notifications>,
    ) {}

    // ROTA CREATE (REGISTER)
    async register(notificationData: Partial<Notifications>): Promise<Notifications> {
        const notification = this.notificationsRepository.create(notificationData);
        return await this.notificationsRepository.save(notification);
    }

    // ROTA GET ALL
    async findAll(): Promise<Notifications[]> {
        return await this.notificationsRepository.find({
            relations: ['users'],
        });
    }

    // ROTA GET BY ID
    async findById(id: number): Promise<Notifications> {
        const notification = await this.notificationsRepository.findOne({
            where: { id },
            relations: ['users'],
        });

        if (!notification) {
            throw new NotFoundException('Notificação não encontrada');
        }

        return notification;
    }

    // ROTA EDIT / UPDATE
    async update(id: number, updateData: Partial<Notifications>): Promise<Notifications> {
        const notification = await this.findById(id);

        Object.assign(notification, updateData);

        return await this.notificationsRepository.save(notification);
    }

    // ROTA DELETE
    async delete(id: number) {
        const notification = await this.findById(id);

        await this.notificationsRepository.remove(notification);

        return { message: 'Notificação removida com sucesso' };
    }
}
