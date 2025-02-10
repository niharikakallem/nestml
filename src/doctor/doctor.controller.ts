import { Controller, Post, Body, Get } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('login')
  async login(@Body() loginDto: { company_id: string; password: string }) {
    return this.doctorService.login(loginDto);
  }

  @Post('register')
  async registerDoctor(@Body() registerDoctorDto: CreateDoctorDto) {
    return this.doctorService.registerDoctor(registerDoctorDto);
  }

  @Get('getAll')
  async getAllDoctors() {
    return this.doctorService.getAllDoctors();
  }
}