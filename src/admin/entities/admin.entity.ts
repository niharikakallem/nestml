import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin_master')
export class Admin {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email_id!: string;

  @Column()
  password!: string;
}