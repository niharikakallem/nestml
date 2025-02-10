import { IsEmail, IsString, IsPhoneNumber, MinLength } from 'class-validator';

//[{"id":1,"city":"Delhi","dob":"1990-01-01","email":"yogi_updated@example.com","mobile":"9876543210",
// "name":"Yogi Updated","password":"newpassword123","sex":"Male","state":"Delhi","patient_id":"PT7891123"},
// {"id":2,"city":"Hyd","dob":"1988-01-01","email":"sai@example.com","mobile":"9876543210","name":"Sai","password":"password123","sex":"Male","state":"Hyd","patient_id":"PT1234567"},{"id":3,"city":"Hyd","dob":"1950-01-01","email":"satish@example.com","mobile":"9876543210",
// "name":"Satish","password":"password123","sex":"Male","state":"Hyd","patient_id":"PT4567890"}]

export class CreatePatientDto {
  @IsPhoneNumber(undefined)
  mobile!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  name!: string;

  @IsString()
  city!: string;

  @IsString()
  state!: string;

  @IsString()
  dob!: string;

  @IsString()
  sex!: string;

  @IsEmail()
  email!: string;
}
