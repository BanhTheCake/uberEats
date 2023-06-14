import { Module, DynamicModule } from '@nestjs/common';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitmqModule.register('AUTH_SERVICES', 'auth-query')],
  exports: [RabbitmqModule],
})
export class AuthCommonModule {}
