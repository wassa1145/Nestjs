import { UsersEntity } from '../user/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { OneToMany } from 'typeorm';
import { CommentsEntity } from './comments/comments.entity';

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text', { nullable: true })
  cover: string;

  @ManyToOne(() => UsersEntity, (user) => user.news)
  user: UsersEntity;

  @OneToMany(() => CommentsEntity, (comments) => comments.news)
  comments: CommentsEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
