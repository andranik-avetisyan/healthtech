import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(configService: ConfigService) {
    const databaseUrl = configService.get<string>('DATABASE_URL');

    const pool = new Pool({ connectionString: databaseUrl });
    
    // Initialize the Prisma PostgreSQL adapter
    const adapter = new PrismaPg(pool);
    
    // Pass the adapter to the parent PrismaClient constructor
    super({ adapter });
  }

  async onModuleInit() {
    // Optional: explicit connection on startup
    await this.$connect();
  }
}