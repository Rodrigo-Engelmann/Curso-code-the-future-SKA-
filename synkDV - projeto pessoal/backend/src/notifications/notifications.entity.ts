import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Notifications {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, u => u.notifications)
  user: User;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 255 })
  content: string;
}
