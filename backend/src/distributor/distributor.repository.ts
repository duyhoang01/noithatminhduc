import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DistributorRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(provinceId?: number) {
    return this.prisma.distributor.findMany({
      where: {
        status: 'active',
        ...(provinceId != null ? { province_id: provinceId } : {}),
      },
    });
  }

  findById(id: string) {
    return this.prisma.distributor.findUnique({
      where: { id: BigInt(id) },
      include: { prices: true },
    });
  }

  findVariantPrice(distributorId: string, variantId: string) {
    return this.prisma.distributorVariantPrice.findUnique({
      where: {
        distributor_id_variant_id: {
          distributor_id: BigInt(distributorId),
          variant_id: BigInt(variantId),
        },
      },
    });
  }

  upsertVariantPrice(distributorId: string, variantId: string, price: number) {
    return this.prisma.distributorVariantPrice.upsert({
      where: {
        distributor_id_variant_id: {
          distributor_id: BigInt(distributorId),
          variant_id: BigInt(variantId),
        },
      },
      update: { current_unit_price: BigInt(price) },
      create: {
        distributor_id: BigInt(distributorId),
        variant_id: BigInt(variantId),
        current_unit_price: BigInt(price),
      },
    });
  }
}
