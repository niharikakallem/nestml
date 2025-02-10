import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/login')
  async login(@Body() loginDto: { email_id: string; password: string }) {
    return this.adminService.login(loginDto);
  }

  @Post('/register')
  async registerAdmin(@Body() registerAdminDto: CreateAdminDto) {
    return this.adminService.registerAdmin(registerAdminDto);
  }
}