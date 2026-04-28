import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface OrderItemInput {
  productId: string;
  variantId: string;
  productNameSnapshot: string;
  variantNameSnapshot: string;
  quantity: number;
  unitPrice: bigint;
  totalPrice: bigint;
  roomName?: string;
}

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  findOrderById(id: string) {
    return this.prisma.order.findUnique({
      where: { id: BigInt(id) },
      include: { order_item: true, pricing_snapshot: true },
    });
  }

  findPackageDiscount(packageId: string) {
    return this.prisma.package.findUnique({
      where: { id: BigInt(packageId) },
      select: { package_discount_amount: true },
    });
  }

  createOrder(
    distributorId: string,
    customerId: string | undefined,
    sumLines: bigint,
    totalPrice: bigint,
    packageDiscount: bigint,
    items: OrderItemInput[],
  ) {
    return this.prisma.order.create({
      data: {
        distributor_id: BigInt(distributorId),
        customer_id: customerId ? BigInt(customerId) : undefined,
        order_item: {
          create: items.map((item) => ({
            product_id: BigInt(item.productId),
            variant_id: BigInt(item.variantId),
            product_name_snapshot: item.productNameSnapshot,
            variant_name_snapshot: item.variantNameSnapshot,
            quantity: item.quantity,
            unit_price: item.unitPrice,
            total_price: item.totalPrice,
            room_name: item.roomName,
          })),
        },
        pricing_snapshot: {
          create: {
            sum_lines: sumLines,
            package_discount: packageDiscount,
            subtotal_after_disc: totalPrice,
            total: totalPrice,
          },
        },
      },
      include: { order_item: true, pricing_snapshot: true },
    });
  }
}
