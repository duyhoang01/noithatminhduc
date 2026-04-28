import { Injectable } from '@nestjs/common';
import { ConfiguratorRepository, type LineInput } from './configurator.repository';
import { PricingService } from '../pricing/pricing.service';

@Injectable()
export class ConfiguratorService {
  constructor(
    private readonly repo: ConfiguratorRepository,
    private readonly pricing: PricingService,
  ) {}

  createSession(distributorId: string, packageId?: string, propertyType?: string) {
    return this.repo.createSession(distributorId, packageId, propertyType);
  }

  getSession(id: string) {
    return this.repo.findSessionById(id);
  }

  async replaceLines(sessionId: string, lines: LineInput[]) {
    const session = await this.repo.findSessionById(sessionId);

    // Resolve distributor prices (DB overrides frontend price)
    let distPriceMap = new Map<string, bigint>();
    if (session?.distributor_id) {
      const prices = await this.repo.findDistributorVariantPrices(String(session.distributor_id));
      distPriceMap = new Map(
        prices
          .filter((p) => p.current_unit_price != null)
          .map((p) => [String(p.variant_id), p.current_unit_price!]),
      );
    }

    const resolvedLines: LineInput[] = lines.map((l) => ({
      ...l,
      unit_price: Number(distPriceMap.get(l.variant_id) ?? BigInt(l.unit_price)),
    }));

    await this.repo.replaceLines(sessionId, resolvedLines);

    let discount = 0n;
    if (session?.package_id) {
      const pkg = await this.repo.findPackageById(String(session.package_id));
      discount = pkg?.package_discount_amount ?? 0n;
    }

    const result = this.pricing.calculate(
      resolvedLines.map((l) => ({
        variantId: l.variant_id,
        unitPrice: BigInt(l.unit_price),
        quantity: l.quantity,
      })),
      [],
      discount,
    );

    const updatedSession = await this.repo.findSessionById(sessionId);

    return {
      session: updatedSession,
      pricing: {
        subtotal: Number(result.subtotal),
        discount: Number(result.discount),
        totalPrice: Number(result.totalPrice),
      },
    };
  }
}
