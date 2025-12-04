import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Milestones } from 'src/milestones/milestones.entity';

@Entity()
export class TaskPages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'smallint', default: 0 })
  type: number;

  @OneToMany(() => Milestones, milestone => milestone.taskPage)
  milestones: Milestones[];
}
