import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Teams } from '../teams/teams.entity';
import { Files } from '../files/files.entity';
import { Milestones } from '../milestones/milestones.entity';

@Entity()
export class Areas {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Teams, team => team.areas)
  team: Teams;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ length: 100 })
  name: string;

  @OneToMany(() => Files, file => file.area)
  files: Files[];

  @OneToMany(() => Milestones, ms => ms.area)
  milestones: Milestones[];
}
