import { NestFactory } from '@nestjs/core';
import { ProxyModule } from './proxy.module';

async function bootstrap() {
  const app = await NestFactory.create(ProxyModule);
  app.setGlobalPrefix('/api/v1');
  await app.listen(3003);
}
bootstrap();
