import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PrescriptionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPrescriptionDto: CreatePrescriptionDto) {
    const patientExists = await this.prisma.patient.findUnique({
      where: { id: createPrescriptionDto.patientId },
    });

    if (!patientExists) {
      throw new NotFoundException(`Cannot create prescription. Patient with ID ${createPrescriptionDto.patientId} not found.`);
    }

    return this.prisma.prescription.create({
      data: {
        patientId: createPrescriptionDto.patientId,
        status: createPrescriptionDto.status,
        medication: createPrescriptionDto.medication,
        subject: createPrescriptionDto.subject,
        requester: createPrescriptionDto.requester,
        dosageInstruction: createPrescriptionDto.dosageInstruction,
        dispenseRequest: createPrescriptionDto.dispenseRequest,
      },
    });
  }

  async findAll() {
    return this.prisma.prescription.findMany({
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const prescription = await this.prisma.prescription.findUnique({
      where: { id },
      include: { patient: true },
    });

    if (!prescription) {
      throw new NotFoundException(`Prescription with ID ${id} not found`);
    }

    return prescription;
  }

  async update(id: number, updatePrescriptionDto: UpdatePrescriptionDto) {
    await this.findOne(id);

    return this.prisma.prescription.update({
      where: { id },
      data: updatePrescriptionDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    
    return this.prisma.prescription.delete({
      where: { id },
    });
  }
}
