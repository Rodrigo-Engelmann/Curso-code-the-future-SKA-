import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Teams } from '../teams/teams.entity';

@Entity()
export class Games {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Teams, team => team.games)
  team: Teams;

  @Column({ length: 255 })
  name: string;
}
