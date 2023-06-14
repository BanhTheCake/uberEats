import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { validateEnv } from '../utils/ValidateEnv';

@Injectable()
export class RabbitmqServices {
  constructor(private configServices: ConfigService) {}
  getOptions(query: string, noAck = false, queueOptions?: any): RmqOptions {
    const [RABBITMQ_URI] = validateEnv(['RABBITMQ_URI'], this.configServices);
    return {
      transport: Transport.RMQ,
      options: {
        urls: [RABBITMQ_URI],
        queue: query,
        queueOptions: {
          durable: true,
          ...queueOptions,
        },
        noAck,
      },
    };
  }
}
