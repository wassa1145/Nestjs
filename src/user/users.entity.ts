import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { NewsEntity } from '../news/news.entity';
import { CommentsEntity } from '../news/comments/comments.entity';
import { IsEnum } from 'class-validator';
import { Role } from '../auth/role/role.enum';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  firstName: string;

  @OneToMany(() => NewsEntity, (news) => news.user)
  news: NewsEntity[];

  @OneToMany(() => CommentsEntity, (comments) => comments.user)
  comments: CommentsEntity[];

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column('text')
  @IsEnum(Role)
  roles: Role;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
