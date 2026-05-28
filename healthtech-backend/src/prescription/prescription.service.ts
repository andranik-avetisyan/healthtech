import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PrescriptionService {
  constructor(private prisma: PrismaService) {}
  
  async create(createPrescriptionDto: CreatePrescriptionDto) {
    if (!createPrescriptionDto.patientId) {
      throw new NotFoundException('Patient not found');
    }
    const patient = await this.prisma.patient.findUnique({ where: { id: createPrescriptionDto.patientId } });
    if (!patient) {
      throw new NotFoundException('Patient not found');
    } 
    return this.prisma.prescription.create({ data: createPrescriptionDto });
  }

  async findAll() {
    return this.prisma.prescription.findMany();
  }

  async findOne(id: number) {
    return this.prisma.prescription.findUnique({ where: { id } });
  }

  async update(id: number, updatePrescriptionDto: UpdatePrescriptionDto) {
    return this.prisma.prescription.update({ where: { id }, data: updatePrescriptionDto });
  }

  async remove(id: number) {
    return this.prisma.prescription.delete({ where: { id } });
  }
}
