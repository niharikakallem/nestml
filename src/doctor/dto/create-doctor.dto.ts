import { IsEmail, IsString, MinLength, IsNumber } from 'class-validator';

export class CreateDoctorDto {
  @IsEmail()
  email_id!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  first_name!: string;

  @IsString()
  last_name!: string;

  @IsString()
  mobile_no!: string;

  @IsString()
  city!: string;

  @IsString()
  state!: string;

  @IsString()
  address!: string;

  @IsString()
  license_registration_no!: string;

  @IsString()
  qualification!: string;

  @IsString()
  collage_name!: string;

  @IsNumber()
  course_year!: number;

  @IsString()
  abhaid!: string;

  @IsNumber()
  user_type_id!: number;
}
