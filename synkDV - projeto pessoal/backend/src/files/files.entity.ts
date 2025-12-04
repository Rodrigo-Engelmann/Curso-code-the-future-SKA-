import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Areas } from '../areas/areas.entity';

@Entity()
export class Files {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Areas, area => area.files)
  area: Areas;

  @Column()
  parent_id: number;

  @Column({ length: 255 })
  name: string;

  @Column()
  type: number;

  @Column({ length: 255 })
  link: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
