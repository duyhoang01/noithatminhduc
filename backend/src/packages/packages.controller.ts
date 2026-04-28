import { Controller, Get, Param, Query } from '@nestjs/common';
import { PackagesService } from './packages.service';

@Controller('packages')
export class PackagesController {
  constructor(private readonly service: PackagesService) {}

  @Get()
  getByDistributor(@Query('distributorId') distributorId: string) {
    return this.service.getByDistributor(distributorId);
  }

  @Get(':id/items')
  getItems(@Param('id') id: string) {
    return this.service.getItems(id);
  }
}
