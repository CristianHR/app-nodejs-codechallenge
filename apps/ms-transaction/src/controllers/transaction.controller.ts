import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateTransactionDto } from '../dto';
import { TransactionService } from '../services/transaction.service';
import { TransactionStatusService } from '../services';

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly transactionStatusService: TransactionStatusService,
  ) {}

  @Post()
  createTransaction(@Body() body: CreateTransactionDto) {
    return this.transactionService.save(body);
  }

  @Get()
  getTransactions() {
    return this.transactionService.findAll();
  }
}
