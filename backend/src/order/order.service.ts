import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { PrismaService } from '../prisma/prisma.service';
import { PricingService } from '../pricing/pricing.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly repo: OrderRepository,
    private readonly prisma: PrismaService,
    private readonly pricing: PricingService,
  ) {}

  getOrder(id: string) {
    return this.repo.findOrderById(id);
  }

  async confirmOrder(sessionId: string) {
    const session = await this.prisma.configuration_session.findUnique({
      where: { id: BigInt(sessionId) },
      include: {
        configuration_line: {
          include: {
            product_variant: { include: { product: true } },
            product: true,
          },
        },
      },
    });

    if (!session) throw new NotFoundException('Configuration session not found');
    if (!session.distributor_id) throw new NotFoundException('Session has no distributor assigned');

    const lines = session.configuration_line;
    if (!lines.length) throw new NotFoundException('Session has no lines');

    let packageDiscount = 0n;
    if (session.package_id) {
      const pkg = await this.repo.findPackageDiscount(String(session.package_id));
      packageDiscount = pkg?.package_discount_amount ?? 0n;
    }

    const pricingResult = this.pricing.calculate(
      lines.map((l) => ({
        variantId: String(l.variant_id),
        unitPrice: l.unit_price_snapshot ?? 0n,
        quantity: l.quantity ?? 1,
      })),
      [],
      packageDiscount,
    );

    const items = lines.map((line) => {
      const variant = line.product_variant;
      const product = line.product ?? variant?.product;
      const variantLabel =
        [variant?.size, variant?.material, variant?.color].filter(Boolean).join(' / ') ||
        String(line.variant_id);

      return {
        productId: String(line.product_id),
        variantId: String(line.variant_id),
        productNameSnapshot: product?.name ?? '',
        variantNameSnapshot: variantLabel,
        quantity: line.quantity ?? 1,
        unitPrice: line.unit_price_snapshot ?? 0n,
        totalPrice: (line.unit_price_snapshot ?? 0n) * BigInt(line.quantity ?? 1),
        roomName: undefined as string | undefined,
      };
    });

    return this.repo.createOrder(
      String(session.distributor_id),
      session.customer_id ? String(session.customer_id) : undefined,
      pricingResult.subtotal,
      pricingResult.totalPrice,
      pricingResult.discount,
      items,
    );
  }
}
