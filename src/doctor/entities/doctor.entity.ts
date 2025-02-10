import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


//[{"id":1,"abhaid":"ABH1234569","address":"123 Main Street","city":"Hyderabad",
// "collage_name":"OM Medical College","company_id":"MBD404685","course_year":2015,
// "email_id":"medibanknew@test.com","first_name":"Sai","gender":"Male",
// "last_name":"Kumar","license_registration_no":"LIC123456789",
// "mobile_no":"9059113683",
// "password":"$2a$10$Wc4Dz0Kq4PKd/ydrnLCkMunpVppo5/nE5NBT/g18VtpSkrcxzJPla","qualification":"MBBS","state":"TG","user_type_id":2}]

@Entity('user_master')
export class Doctor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_id!: string;

  @Column()
  email_id!: string;

  @Column()
  password!: string;  // This will store the hashed password

  @Column()
  abhaid!: string;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column()
  gender!: string;

  @Column()
  mobile_no!: string;

  @Column()
  city!: string;

  @Column()
  address!: string;

  @Column()
  state!: string;

  @Column()
  license_registration_no!: string;

  @Column()
  qualification!: string;

  @Column()
  collage_name!: string;

  @Column()
  course_year!: number;

  @Column()
  user_type_id!: number;
}