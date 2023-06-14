import { Module, DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, RmqOptions, Transport } from '@nestjs/microservices';
import { validateEnv } from '../utils/ValidateEnv';
import { RabbitmqServices } from './rabbitmq.services';

@Module({
  providers: [RabbitmqServices],
  exports: [RabbitmqServices],
})
export class RabbitmqModule {
  static register(
    services: string,
    query: string,
    queueOptions?: any,
  ): DynamicModule {
    return {
      module: RabbitmqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: services,
            useFactory: (configServices: ConfigService): RmqOptions => {
              const [RABBITMQ_URI] = validateEnv(
                ['RABBITMQ_URI'],
                configServices,
              );

              return {
                transport: Transport.RMQ,
                options: {
                  urls: [RABBITMQ_URI],
                  queue: query,
                  queueOptions: {
                    durable: true,
                    ...queueOptions,
                  },
                },
              };
            },
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
