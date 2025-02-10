import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Doctor } from '../doctor/entities/doctor.entity';
import { Patient } from '../patient/entities/patient.entity';
import { Admin } from '../admin/entities/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Doctor, 'doctorPatientDB') private doctorRepo: Repository<Doctor>,
    @InjectRepository(Patient, 'doctorPatientDB') private patientRepo: Repository<Patient>,
    @InjectRepository(Admin, 'adminDB') private adminRepo: Repository<Admin>,
  ) {}

  // Function to handle login for all roles
  async login(loginDto: any, role: string) {
    let user;

    if (role === 'doctor') {
      user = await this.doctorRepo.findOne({ where: { email_id: loginDto.emailId } });
    } else if (role === 'patient') {
      user = await this.patientRepo.findOne({ where: { mobile: loginDto.mbno } });
    } else if (role === 'admin') {
      user = await this.adminRepo.findOne({ where: { email_id: loginDto.emailId } });
    }

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare hashed password with input password
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Payload to sign the JWT token
    const payload = { username: user.emailId || user.mbno, sub: user.id, role };

    // Return the access token
    return { access_token: this.jwtService.sign(payload) };
  }
}
