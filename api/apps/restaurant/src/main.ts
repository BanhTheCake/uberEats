import { NestFactory } from '@nestjs/core';
import { RestaurantModule } from './restaurant.module';

async function bootstrap() {
  const app = await NestFactory.create(RestaurantModule);
  app.setGlobalPrefix('/api/v1');
  await app.listen(3001);
}
bootstrap();
