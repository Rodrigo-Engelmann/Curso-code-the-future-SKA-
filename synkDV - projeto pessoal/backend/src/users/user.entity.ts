import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Teams } from '../teams/teams.entity';
import { Notifications } from '../notifications/notifications.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Teams, team => team.users)
  @JoinTable()
  teams: Teams[];

  @Column({ length: 255 })
  username: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 100, default: 'user' })
  privileges: string;

  @Column({ default: '/uploads/profile/profile-picture-placeholder.jpg', nullable: true })
  profile_picture: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => Notifications, notif => notif.user)
  notifications: Notifications[];
}
