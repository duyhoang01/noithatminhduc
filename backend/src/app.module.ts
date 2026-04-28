import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CatalogModule } from './catalog/catalog.module';
import { ConfiguratorModule } from './configurator/configurator.module';
import { PricingModule } from './pricing/pricing.module';
import { OrderModule } from './order/order.module';
import { DistributorModule } from './distributor/distributor.module';
import { LeadModule } from './lead/lead.module';
import { StorageModule } from './storage/storage.module';
import { PackagesModule } from './packages/packages.module';

@Module({
  imports: [
    PrismaModule,
    CatalogModule,
    ConfiguratorModule,
    PricingModule,
    OrderModule,
    DistributorModule,
    LeadModule,
    StorageModule,
    PackagesModule,
  ],
})
export class AppModule {}
