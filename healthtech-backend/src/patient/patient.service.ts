import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}
  
  async create(createPatientDto: CreatePatientDto) {
    return this.prisma.patient.create({ data: createPatientDto });
  }

  async findAll() {
    return this.prisma.patient.findMany();
  }

  async findOne(id: number) {
    return this.prisma.patient.findUnique({ where: { id } });
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    return this.prisma.patient.update({ where: { id }, data: updatePatientDto });
  }

  async remove(id: number) {
    return this.prisma.patient.delete({ where: { id } });
  }
}
 