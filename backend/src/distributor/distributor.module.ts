import { Module } from '@nestjs/common';
import { DistributorController } from './distributor.controller';
import { DistributorService } from './distributor.service';
import { DistributorRepository } from './distributor.repository';

@Module({
  controllers: [DistributorController],
  providers: [DistributorService, DistributorRepository],
  exports: [DistributorService],
})
export class DistributorModule {}
