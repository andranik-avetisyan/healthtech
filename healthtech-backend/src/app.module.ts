import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './patient/patient.module';
import { PrescriptionModule } from './prescription/prescription.module';

@Module({
  imports: [PatientModule, PrescriptionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
