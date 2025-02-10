import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor, 'doctorPatientDB') // Correct repository injection
    private readonly doctorRepo: Repository<Doctor>,
    private readonly jwtService: JwtService, 
  ) {}

  async login(loginDto: { company_id: string; password: string }) {
    const doctor = await this.doctorRepo.findOne({ where: { company_id: loginDto.company_id } });
    if (!doctor || !(await bcrypt.compare(loginDto.password, doctor.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { company_id: doctor.company_id, sub: doctor.id, role: 'doctor' };
    const access_token = this.jwtService.sign(payload);
    return { company_id: doctor.company_id, access_token };
  }

  async registerDoctor(registerDoctorDto: CreateDoctorDto) {
    const { email_id, password } = registerDoctorDto;

    // Check if the doctor already exists by email
    const existingDoctor = await this.doctorRepo.findOne({ where: { email_id } });
    if (existingDoctor) {
      throw new ConflictException('Doctor already exists');
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new doctor record with hashed password
    const doctor = this.doctorRepo.create({ ...registerDoctorDto, password: hashedPassword });

    await this.doctorRepo.save(doctor);

    return { message: 'Doctor registered successfully' };
  }

  async getAllDoctors() {
    return this.doctorRepo.find();
  }
}
