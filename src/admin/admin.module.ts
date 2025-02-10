import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({ 
  imports: [
      TypeOrmModule.forFeature([Admin],'adminDB'),
      JwtModule.register({
        secret: process.env.JWT_SECRET || 'satyam', // Use your secret key here
        signOptions: { expiresIn: '60m' },
      }),
    ],  
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}