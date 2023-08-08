import { Injectable } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Injectable()
export class MsAntifraudService {
  getHello(): string {
    return 'Hello World from ms-antifraud!';
  }
}
