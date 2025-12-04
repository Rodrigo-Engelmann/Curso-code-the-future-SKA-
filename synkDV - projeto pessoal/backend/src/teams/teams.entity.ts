import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { Areas } from '../areas/areas.entity';
import { User } from '../users/user.entity';
import { Games } from '../games/games.entity';

@Entity()
export class Teams {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Areas, area => area.team)
  areas: Areas[];

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @ManyToMany(() => User, user => user.teams, { cascade: true })
  users: User[];

  @ManyToOne(() => User, { nullable: false })
  owner: User;

  @OneToMany(() => Games, game => game.team)
  games: Games[];
}
