import { Module } from '@nestjs/common';
import { ConfiguratorController } from './configurator.controller';
import { ConfiguratorService } from './configurator.service';
import { ConfiguratorRepository } from './configurator.repository';
import { PricingModule } from '../pricing/pricing.module';

@Module({
  imports: [PricingModule],
  controllers: [ConfiguratorController],
  providers: [ConfiguratorService, ConfiguratorRepository],
  exports: [ConfiguratorService],
})
export class ConfiguratorModule {}
