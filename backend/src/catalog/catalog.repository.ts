import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CatalogRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAllProducts() {
    return this.prisma.product.findMany({
      include: { product_variant: true },
    });
  }

  findProductById(id: string) {
    return this.prisma.product.findUnique({
      where: { id: BigInt(id) },
      include: { product_variant: true },
    });
  }

  findVariantsByProductAndDistributor(productId: string, distributorId: string) {
    return this.prisma.product_variant.findMany({
      where: {
        product_id: BigInt(productId),
        prices: { some: { distributor_id: BigInt(distributorId) } },
      },
      include: {
        product_images: { orderBy: { is_primary: 'desc' } },
        prices: {
          where: { distributor_id: BigInt(distributorId) },
          select: { current_unit_price: true },
        },
      },
    });
  }
}
