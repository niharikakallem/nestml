import { Module,MiddlewareConsumer,RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module'; 
import { AuthModule } from './auth/auth.module';
import { ProtectedController } from './protect/protect.controller';
import { LoggerMiddleware } from './logger/logger.middleware';
import { AdminModule } from './admin/admin.module';
import { Doctor } from './doctor/entities/doctor.entity';
import { Patient } from './patient/entities/patient.entity';
import { DataSource } from 'typeorm';
import { Admin } from './admin/entities/admin.entity';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(), 
    TypeOrmModule.forRootAsync({
      name: 'doctorPatientDB', // Connection for Doctor & Patient
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DOCTOR_PATIENT_DB_HOST,
        port: parseInt(process.env.DOCTOR_PATIENT_DB_PORT || '5432', 10),
        username: process.env.DOCTOR_PATIENT_DB_USER,
        password: process.env.DOCTOR_PATIENT_DB_PASS,
        database: process.env.DOCTOR_PATIENT_DB_NAME,
        entities: [Doctor, Patient],
        synchronize: false,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }),
    }),
    TypeOrmModule.forRootAsync({
      name: 'adminDB', // Connection for Admin
      useFactory: () => ({
        type: 'postgres',
        host: process.env.ADMIN_DB_HOST,
        port: parseInt(process.env.ADMIN_DB_PORT || '5432', 10),
        username: process.env.ADMIN_DB_USER,
        password: process.env.ADMIN_DB_PASS,
        database: process.env.ADMIN_DB_NAME,
        entities: [Admin],
        synchronize: false,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }),
    }), 
    DoctorModule,
    PatientModule,
    AuthModule,
    AdminModule,
  ],
  controllers: [ProtectedController]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}