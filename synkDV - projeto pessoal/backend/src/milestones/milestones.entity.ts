import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany } from 'typeorm';
import { Areas } from '../areas/areas.entity';
import { Tasks } from '../tasks/tasks.entity';
import { TaskPages } from '../taskPages/taskPages.entity';

@Entity()
export class Milestones {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Areas, area => area.milestones)
  area: Areas;

  @OneToMany(() => Tasks, task => task.milestone)
  tasks: Tasks[];

  @ManyToOne(() => TaskPages, taskPage => taskPage.milestones, { nullable: false })
  taskPage: TaskPages;

  @Column({ length: 17 })
  title: string;

  @Column({ length: 100 })
  description: string;

  @Column({ type: 'datetime' })
  term: Date;

}
