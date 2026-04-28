import { Injectable, NotFoundException } from '@nestjs/common';
import { PackagesRepository } from './packages.repository';

@Injectable()
export class PackagesService {
  constructor(private readonly repo: PackagesRepository) {}

  getByDistributor(distributorId: string) {
    return this.repo.findByDistributor(distributorId);
  }

  async getItems(packageId: string) {
    const pkg = await this.repo.findWithItems(packageId);
    if (!pkg) throw new NotFoundException('Package not found');
    return pkg;
  }
}
