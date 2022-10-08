import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          // url: process.env.DATABASE_URL,
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
}
