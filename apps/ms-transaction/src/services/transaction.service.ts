import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTransactionDto, UpdateTransactionDto } from '../dto';
import { Transaction, TransactionStatus, TransactionType } from '../models';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionStatus)
    private readonly transactionStatusRepository: Repository<TransactionStatus>,
    @InjectRepository(TransactionType)
    private readonly transactionTypeRepository: Repository<TransactionType>,
    @Inject('MS_ANTIFRAUD') private readonly clientAntifraud: ClientProxy,
  ) {}
  async save(data: CreateTransactionDto) {
    console.log('consulting service transaction');
    this.clientAntifraud.emit('transaction_create', data);
    console.log('send queue');

    const transaction: Transaction = await this.transactionRepository.create(
      data,
    );
    return this.transactionRepository.save(transaction);
  }

  async findAll(): Promise<Transaction[]> {
    return await this.transactionRepository.find();
  }

  findOne(id: number): Promise<Transaction> {
    return this.transactionRepository.findOneOrFail({ where: { id } });
  }

  getTransactionsStatus(id: number): Promise<TransactionStatus> {
    return this.transactionStatusRepository.findOne({ where: { id } });
  }

  getTransactionsType(id: number): Promise<TransactionType> {
    return this.transactionTypeRepository.findOne({ where: { id } });
  }

  /*
  async update(data: UpdateTransactionDto) {
    const transaction: Transaction = await this.transactionRepository.preload({
      ...data,
    });

    if (!transaction) {
      throw new NotFoundException('Resource not found');
    }

    return transaction;
  }*/
}
