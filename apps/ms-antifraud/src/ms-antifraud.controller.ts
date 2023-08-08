import { Controller, Get } from '@nestjs/common';
import { MsAntifraudService } from './ms-antifraud.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class MsAntifraudController {
  constructor(private readonly msAntifraudService: MsAntifraudService) {}

  @Get()
  getHello(): string {
    return this.msAntifraudService.getHello();
  }

  @EventPattern('transaction_create')
  CreateTransaction(data: any): void {
    console.log('este es un evento entrante en antifraud: ', data);
  }
}
