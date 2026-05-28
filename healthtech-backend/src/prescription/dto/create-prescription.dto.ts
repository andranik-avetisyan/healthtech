import { IsString, IsNotEmpty, IsInt, IsEnum, IsOptional } from 'class-validator';
import { PrescriptionStatus } from 'generated/prisma/client';

export class CreatePrescriptionDto {
  @IsInt()
  @IsNotEmpty()
  patientId!: number;

  @IsEnum(PrescriptionStatus)
  @IsOptional()
  status?: PrescriptionStatus;

  @IsString()
  @IsNotEmpty()
  medication!: string;

  @IsString()
  @IsNotEmpty()
  subject!: string;

  @IsString()
  @IsNotEmpty()
  requester!: string;

  @IsString()
  @IsNotEmpty()
  dosageInstruction!: string;

  @IsString()
  @IsNotEmpty()
  dispenseRequest!: string;
}