import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('protected')
export class ProtectedController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getProtectedData(@Request() req) {
    return { message: 'This is a protected route', user: req.user };
  }
}
