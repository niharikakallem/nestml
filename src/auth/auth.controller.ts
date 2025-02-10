import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('doctor/login')
  async doctorLogin(@Body() loginDto: any) {
    return this.authService.login(loginDto, 'doctor');
  }

  @Post('patient/login')
  async patientLogin(@Body() loginDto: any) {
    return this.authService.login(loginDto, 'patient');
  }

  @Post('admin/login')
  async adminLogin(@Body() loginDto: any) {
    return this.authService.login(loginDto, 'admin');
  }
}
