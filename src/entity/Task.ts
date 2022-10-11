import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskTag } from './TaskTag';
import { User } from './User';

@ObjectType()
@Entity()
export class Task extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column({ default: false })
  isCompleted: boolean;

  @Column()
  userId: number;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToMany(() => TaskTag, (taskTag) => taskTag.task_id)
  taskTag: TaskTag[];
}
