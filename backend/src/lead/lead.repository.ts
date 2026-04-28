import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LeadRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.lead.findMany({ include: { customer: true } });
  }

  create(name: string, phone: string) {
    return this.prisma.lead.create({
      data: {
        customer: {
          create: { full_name: name, phone },
        },
      },
      include: { customer: true },
    });
  }
}
