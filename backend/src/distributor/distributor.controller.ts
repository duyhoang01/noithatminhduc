import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { DistributorService } from './distributor.service';

@Controller('distributors')
export class DistributorController {
  constructor(private readonly service: DistributorService) {}

  @Get()
  getAll(@Query('provinceId') provinceId?: string) {
    return this.service.getAll(provinceId ? Number(provinceId) : undefined);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.getOne(id);
  }

  @Post(':id/prices')
  setPrice(
    @Param('id') distributorId: string,
    @Body() body: { variant_id: string; price: number },
  ) {
    return this.service.setVariantPrice(distributorId, body.variant_id, body.price);
  }
}
