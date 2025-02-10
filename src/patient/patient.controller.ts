import { Controller, Post, Body, Get } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('login')
  async login(@Body() loginDto: { mobile: string; password: string }) {
    return this.patientService.login(loginDto);
  }

  // Patient Registration Route
  @Post('register')
  async registerPatient(@Body() registerPatientDto: CreatePatientDto) {
    return this.patientService.registerPatient(registerPatientDto);
  }

  @Get('getAll')
  async getAllPatients() {
    return this.patientService.getAllPatients();
  }
}