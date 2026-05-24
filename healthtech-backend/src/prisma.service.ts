import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // Create a new pg Pool instance
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    
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