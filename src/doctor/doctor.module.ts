import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { JwtModule } from '@nestjs/jwt';  // Import JwtModule
 

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor],'doctorPatientDB'),  // Make sure this is properly configured
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'satyam', // Use your secret key here
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [DoctorService],
  controllers: [DoctorController],
})
export class DoctorModule {}