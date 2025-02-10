import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateAdminDto {
  @IsEmail()
  email_id!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}
