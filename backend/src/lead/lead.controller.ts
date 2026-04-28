import { Controller, Get, Post, Body } from '@nestjs/common';
import { LeadService } from './lead.service';

@Controller('leads')
export class LeadController {
  constructor(private readonly service: LeadService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Post()
  create(@Body() body: { name: string; phone: string }) {
    return this.service.create(body.name, body.phone);
  }
}
