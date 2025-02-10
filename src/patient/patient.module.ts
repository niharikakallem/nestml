import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientService } from './patient.service';
import { JwtModule } from '@nestjs/jwt';
import { PatientController } from './patient.controller';
import { Patient } from './entities/patient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient], 'doctorPatientDB'), 
     JwtModule.register({
           secret: process.env.JWT_SECRET || 'satyam', // Use your secret key here
           signOptions: { expiresIn: '60m' },
         }),
  ],
  providers: [PatientService],
  controllers: [PatientController],
  exports: [PatientService],
})
export class PatientModule {}