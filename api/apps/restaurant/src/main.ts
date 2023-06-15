import { NestFactory } from '@nestjs/core';
import { RestaurantModule } from './restaurant.module';
import setupSwagger from './utils/setupSwagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(RestaurantModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.setGlobalPrefix('/api/v1');
  setupSwagger(app);
  await app.listen(3001);
}
bootstrap();
