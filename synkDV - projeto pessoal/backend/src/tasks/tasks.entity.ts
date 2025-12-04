import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Milestones } from '../milestones/milestones.entity';

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Milestones, ms => ms.tasks)
  milestone: Milestones;

  @Column({ length: 255 })
  responsable: string;

  @Column({ length: 17 })
  title: string;

  @Column({ length: 100 })
  description: string;

  @Column({ length: 100, default: 'inQueue' })
  status: string;

  @Column({ type: 'datetime' })
  term: Date;
}
