import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPatientDto: CreatePatientDto) {
    return this.prisma.patient.create({
      data: {
        firstName: createPatientDto.firstName,
        lastName: createPatientDto.lastName,
        gender: createPatientDto.gender,
        phone: createPatientDto.phone,
        birthDate: new Date(createPatientDto.birthDate), 
        active: true,
      },
    });
  }

  async findAll() {
    return this.prisma.patient.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    return patient;
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    await this.findOne(id);

    return this.prisma.patient.update({
      where: { id },
      data: {
        ...updatePatientDto,
        birthDate: updatePatientDto.birthDate ? new Date(updatePatientDto.birthDate) : undefined,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    
    return this.prisma.patient.delete({
      where: { id },
    });
  }
}
