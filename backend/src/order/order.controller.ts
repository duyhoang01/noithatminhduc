import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { ConfirmOrderDto } from './dto/confirm-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Get(':id')
  getOrder(@Param('id') id: string) {
    return this.service.getOrder(id);
  }

  @Post('confirm')
  confirm(@Body() dto: ConfirmOrderDto) {
    return this.service.confirmOrder(dto.sessionId);
  }
}
