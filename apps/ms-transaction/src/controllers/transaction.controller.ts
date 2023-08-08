import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateTransactionDto } from '../dto';
//import { Transaction } from 'src/models/transaction.entity';
import { TransactionService } from '../services/transaction.service';
import { TransactionStatusService } from '../services';

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly transactionStatusService: TransactionStatusService,
  ) {}

  /*@Get()
  async getTransaction(): Promise<Transaction[]> {
    return this.transactionService.getList();
  }

  @Post()
  async createTransaction(@Body() body: CreateTransactionDto): Promise<void> {
    return this.transactionService.save(body);
  }*/
  @Post()
  createTransaction(@Body() body: CreateTransactionDto) {
    return this.transactionService.save(body);
    //return 'this.transactionService.save(body)';
  }
  @Get()
  getTransactions() {
    return this.transactionService.findAll();
    //return this.transactionService.getTransactionsStatus(1);
    //return this.transactionStatusService.findAll();
    //return this.transactionStatusService.getTransactionsStatus(1);
    //return 'this.transactionService.save(body)';
  }
}
