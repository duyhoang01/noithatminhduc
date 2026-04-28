import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PackagesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByDistributor(distributorId: string) {
    return this.prisma.package.findMany({
      where: { distributor_id: BigInt(distributorId) },
      orderBy: { segment: 'asc' },
    });
  }

  findWithItems(packageId: string) {
    return this.prisma.package.findUnique({
      where: { id: BigInt(packageId) },
      include: {
        package_item: {
          include: {
            product: {
              include: { product_images: { where: { variant_id: null } } },
            },
            product_variant: {
              include: {
                product_images: true,
                prices: true,
              },
            },
            room: true,
          },
          orderBy: { id: 'asc' },
        },
      },
    });
  }
}
