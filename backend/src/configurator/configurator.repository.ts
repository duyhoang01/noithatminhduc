import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface LineInput {
  product_id: string;
  variant_id: string;
  quantity: number;
  unit_price: number;
}

@Injectable()
export class ConfiguratorRepository {
  constructor(private readonly prisma: PrismaService) {}

  createSession(distributorId: string, packageId?: string, propertyType?: string) {
    return this.prisma.configuration_session.create({
      data: {
        distributor_id: BigInt(distributorId),
        ...(packageId ? { package_id: BigInt(packageId) } : {}),
        ...(propertyType ? { property_type: propertyType as any } : {}),
      },
    });
  }

  findSessionById(id: string) {
    return this.prisma.configuration_session.findUnique({
      where: { id: BigInt(id) },
      include: { configuration_room: true, configuration_line: true },
    });
  }

  findPackageById(packageId: string) {
    return this.prisma.package.findUnique({
      where: { id: BigInt(packageId) },
      select: { package_discount_amount: true },
    });
  }

  findDistributorVariantPrices(distributorId: string) {
    return this.prisma.distributorVariantPrice.findMany({
      where: { distributor_id: BigInt(distributorId) },
      select: { variant_id: true, current_unit_price: true },
    });
  }

  replaceLines(sessionId: string, lines: LineInput[]) {
    const sessionBigInt = BigInt(sessionId);
    return this.prisma.$transaction([
      this.prisma.configuration_line.deleteMany({
        where: { session_id: sessionBigInt },
      }),
      this.prisma.configuration_line.createMany({
        data: lines.map((l) => ({
          session_id: sessionBigInt,
          product_id: BigInt(l.product_id),
          variant_id: BigInt(l.variant_id),
          quantity: l.quantity,
          unit_price_snapshot: BigInt(l.unit_price),
        })),
      }),
    ]);
  }
}
