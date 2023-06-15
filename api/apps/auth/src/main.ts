import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import setupSwagger from './utils/setupSwagger';
import * as cookieParser from 'cookie-parser';
import { MicroserviceOptions } from '@nestjs/microservices';
import { RabbitmqServices } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.setGlobalPrefix('/api/v1');
  setupSwagger(app);

  const rabbitmqServices = app.get<RabbitmqServices>(RabbitmqServices);
  //
  app.connectMicroservice<MicroserviceOptions>(
    rabbitmqServices.getOptions('auth-query', true),
  );
  await Promise.all([app.startAllMicroservices(), app.listen(3000)]);
}
bootstrap();
