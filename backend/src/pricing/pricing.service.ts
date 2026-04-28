import { Injectable } from '@nestjs/common';
import {
  calculatePrice,
  type ConfigurationLine,
  type DistributorVariantPrice,
  type PricingResult,
} from './pricing.engine';

@Injectable()
export class PricingService {
  calculate(
    lines: ConfigurationLine[],
    distributorPrices: DistributorVariantPrice[] = [],
    discount = 0n,
  ): PricingResult {
    return calculatePrice({ lines, distributorPrices, discount });
  }
}
