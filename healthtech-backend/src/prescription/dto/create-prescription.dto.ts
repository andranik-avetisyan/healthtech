import { IsNegative, IsOptional, IsString } from 'class-validator';

export class CreatePrescriptionDto {
  @IsNegative()
  patientId!: number;
  
  @IsString()
  medication!: string;

  @IsString()
  subject!: string;

  @IsString()
  requester!: string;

  @IsString()
  dosageInstruction!: string;

  @IsString()
  @IsOptional()
  dispenseRequest!: string;
}