import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ConfiguratorService } from './configurator.service';
import { UpdateLinesDto } from './dto/update-lines.dto';

@Controller('sessions')
export class ConfiguratorController {
  constructor(private readonly service: ConfiguratorService) {}

  @Post()
  create(@Body() body: { distributorId: string; packageId?: string; propertyType?: string }) {
    return this.service.createSession(body.distributorId, body.packageId, body.propertyType);
  }

  @Get(':id')
  getSession(@Param('id') id: string) {
    return this.service.getSession(id);
  }

  @Patch(':id/lines')
  updateLines(@Param('id') id: string, @Body() dto: UpdateLinesDto) {
    return this.service.replaceLines(id, dto.lines);
  }
}
