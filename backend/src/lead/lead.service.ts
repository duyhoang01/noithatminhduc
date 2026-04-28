import { Injectable } from '@nestjs/common';
import { LeadRepository } from './lead.repository';

@Injectable()
export class LeadService {
  constructor(private readonly repo: LeadRepository) {}

  getAll() {
    return this.repo.findAll();
  }

  create(name: string, phone: string) {
    return this.repo.create(name, phone);
  }
}
