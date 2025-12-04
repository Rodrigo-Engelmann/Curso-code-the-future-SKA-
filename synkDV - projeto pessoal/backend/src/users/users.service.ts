import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

import { UpdateUserDto } from '../auth/dto/update-user.dto';


@Injectable()
export class UsersService {
    [x: string]: any;
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async register(userData: Partial<User>): Promise<User> {
        if (!userData.password) {
            throw new Error('Password is required');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const user = this.usersRepository.create({
            ...userData,
            password: hashedPassword,
        });

        return await this.usersRepository.save(user);
    }

    async login(email: string, password: string): Promise<User | null> {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;

        return user;
    }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async findById(id: number): Promise<User | null> {
        return await this.usersRepository.findOne({ where: { id } });
    }

    async deleteAccount(userId: number) {
        await this.usersRepository.delete(userId);
        return { message: 'Conta deletada com sucesso' };
    }

    async updateUser(
        id: number,
        data: Partial<UpdateUserDto>,
        file?: Express.Multer.File
    ) {
        // Usando o repositório correto
        const user = await this.usersRepository.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        // Atualizar campos se existirem
        if (data.name) user.username = data.name; // se no frontend está "name", aqui atualiza "username", é mais pra segurança mesmo
        if (data.email) user.email = data.email;

        // Atualiza foto
        if (file) {
            user.profile_picture = `/uploads/profile/${file.filename}`;
        }

        return this.usersRepository.save(user);
    }

    async findByEmail(email: string) {
        const user = await this.usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        return user;
    }
}
