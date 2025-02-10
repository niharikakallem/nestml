import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient, 'doctorPatientDB')
    private readonly patientRepo: Repository<Patient>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: { mobile: string; password: string }) {
    const patient = await this.patientRepo.findOne({ where: { mobile: loginDto.mobile } });
    if (!patient || !(await bcrypt.compare(loginDto.password, patient.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { mobile: patient.mobile, sub: patient.id, role: 'patient' };
    const access_token = this.jwtService.sign(payload);
    return { mobile: patient.mobile, access_token };
  }

  // Register Patient with password encryption
  async registerPatient(registerPatientDto: CreatePatientDto) {
    const { mobile, password } = registerPatientDto;

    // Check if the patient already exists by mobile number (mbno)
    const existingPatient = await this.patientRepo.findOne({ where: { mobile } });
    if (existingPatient) {
      throw new ConflictException('Patient already exists');
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10

    // Create a new patient record with hashed password
    const patient = this.patientRepo.create({ ...registerPatientDto, password: hashedPassword });
    await this.patientRepo.save(patient);

    return { message: 'Patient registered successfully' };
  }

  async getAllPatients() {
    return this.patientRepo.find();
  }
}