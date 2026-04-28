import { Injectable } from '@nestjs/common';
import { DistributorRepository } from './distributor.repository';

@Injectable()
export class DistributorService {
  constructor(private readonly repo: DistributorRepository) {}

  getAll(provinceId?: number) {
    return this.repo.findAll(provinceId);
  }

  getOne(id: string) {
    return this.repo.findById(id);
  }

  getVariantPrice(distributorId: string, variantId: string) {
    return this.repo.findVariantPrice(distributorId, variantId);
  }

  setVariantPrice(distributorId: string, variantId: string, price: number) {
    return this.repo.upsertVariantPrice(distributorId, variantId, price);
  }
}
