import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PackagesController } from './packages.controller';
import { PackagesService } from './packages.service';
import { PackagesRepository } from './packages.repository';

@Module({
  imports: [PrismaModule],
  controllers: [PackagesController],
  providers: [PackagesService, PackagesRepository],
})
export class PackagesModule {}
