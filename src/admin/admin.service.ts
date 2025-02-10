import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin, 'adminDB')
    private readonly adminRepo: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}
 

  async login(loginDto: { email_id: string; password: string }) {
    const admin = await this.adminRepo.findOne({ where: { email_id: loginDto.email_id } });
    if (!admin || !(await bcrypt.compare(loginDto.password, admin.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: admin.email_id, sub: admin.id, role: 'admin' };
    const access_token = this.jwtService.sign(payload);
    return { email_id: admin.email_id, access_token };
  }

  // Register Admin with encrypted password
  async registerAdmin(registerAdminDto: CreateAdminDto) {
    const { email_id, password } = registerAdminDto; 

    // Check if admin already exists
    const existingAdmin = await this.adminRepo.findOne({ where: { email_id } }); 
    if (existingAdmin) {
      throw new ConflictException('Admin already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin and save
    const admin = this.adminRepo.create({ ...registerAdminDto, password: hashedPassword });
    await this.adminRepo.save(admin);

    return { message: 'Admin registered successfully' };
  }
 
}