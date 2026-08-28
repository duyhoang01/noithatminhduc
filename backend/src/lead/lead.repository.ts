import { Injectable } from '@nestjs/common';
import { lead_interest_enum } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

const VALID_INTERESTS = Object.values(lead_interest_enum);

@Injectable()
export class LeadRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.lead.findMany({ include: { customer: true } });
  }

  create(name: string, phone: string, interest?: string) {
    const validInterest = VALID_INTERESTS.includes(interest as lead_interest_enum)
      ? (interest as lead_interest_enum)
      : undefined;

    return this.prisma.lead.create({
      data: {
        interest: validInterest,
        customer: {
          create: { full_name: name, phone },
        },
      },
      include: { customer: true },
    });
  }
}
