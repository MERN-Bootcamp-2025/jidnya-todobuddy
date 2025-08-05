import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { User } from './User';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: 'todo',
  })
  status!: 'todo' | 'in progress' | 'on hold' | 'done' | 'will not do';

  @Column({
    type: 'varchar',
    length: 20,
    default: 'medium',
  })
  priority!: 'low' | 'medium' | 'high' | 'critical';

  @Column({ type: 'timestamp', nullable: true })
  expected_completion_at!: Date | null;

  @Column({ type: 'uuid' })
  user_id!: string;

  @ManyToOne(() => User, (user) => user.todos)
  user!: User;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @CreateDateColumn()
  created_at!: Date;
  
  @UpdateDateColumn()
  updated_at!: Date;
}