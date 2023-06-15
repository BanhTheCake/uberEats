import { Module, DynamicModule, Global } from '@nestjs/common';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';

@Global()
@Module({
  imports: [RabbitmqModule.register('AUTH_SERVICES', 'auth-query')],
  exports: [RabbitmqModule],
})
export class AuthCommonModule {}
