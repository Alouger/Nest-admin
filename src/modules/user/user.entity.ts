import { Entity, Column, Unique, PrimaryGeneratedColumn } from 'typeorm';

// 使用Entity绑定admin_user这张表和这个类，形成映射关系
@Entity('admin_user')
// 按照数据库中admin_user那张表的字段来定义这个类
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @Unique(['username'])
  username: string;
  @Column()
  password: string;
  @Column()
  avatar: string;
  @Column()
  role: string;
  @Column()
  nickname: string;
  @Column()
  active: number;
}
