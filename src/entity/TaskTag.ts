import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from './Tag';
import { Task } from './Task';

@ObjectType()
@Entity()
export class TaskTag extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ name: 'taskId' })
  @Column()
  task_id: number;

  @Field({ name: 'tagId' })
  @Column()
  tag_id: number;

  @ManyToOne(() => Task, (task) => task.taskTag, { onDelete: 'CASCADE' })
  @JoinTable()
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @ManyToOne(() => Tag, (tag) => tag.taskTag, { onDelete: 'CASCADE' })
  @JoinTable()
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;
}
