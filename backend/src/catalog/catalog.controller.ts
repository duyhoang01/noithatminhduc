import { Controller, Get, Param, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly service: CatalogService) {}

  @Get('provinces')
  getProvinces() {
    return this.service.getProvinces();
  }

  @Get('products')
  getProducts() {
    return this.service.getProducts();
  }

  @Get('products/:id')
  getProduct(@Param('id') id: string) {
    return this.service.getProduct(id);
  }

  @Get('products/:id/variants')
  getVariants(
    @Param('id') id: string,
    @Query('distributorId') distributorId: string,
  ) {
    return this.service.getVariantsByProductAndDistributor(id, distributorId);
  }
}
