import { IsDateString, IsEnum, IsPhoneNumber, IsOptional, IsString } from 'class-validator';
import { Gender } from 'generated/prisma/client';

export class CreatePatientDto {
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsDateString()
  birthDate!: string;

  @IsEnum(Gender)
  gender!: Gender;
}
