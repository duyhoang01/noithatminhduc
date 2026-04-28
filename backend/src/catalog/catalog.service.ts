import { Injectable } from '@nestjs/common';
import { CatalogRepository } from './catalog.repository';

const VIETNAM_PROVINCES = [
  { id: 1, name: 'Hà Nội' },
  { id: 27, name: 'Bắc Ninh' },
  { id: 33, name: 'Hưng Yên' },
  { id: 35, name: 'Hà Nam' },
  { id: 36, name: 'Nam Định' },
  { id: 37, name: 'Ninh Bình' },
];

@Injectable()
export class CatalogService {
  constructor(private readonly repo: CatalogRepository) {}

  getProvinces() {
    return VIETNAM_PROVINCES;
  }

  getProducts() {
    return this.repo.findAllProducts();
  }

  getProduct(id: string) {
    return this.repo.findProductById(id);
  }

  getVariantsByProductAndDistributor(productId: string, distributorId: string) {
    return this.repo.findVariantsByProductAndDistributor(productId, distributorId);
  }
}
