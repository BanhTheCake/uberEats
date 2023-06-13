import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/proxy/.env',
    }),
  ],
  controllers: [ProxyController],
  providers: [ProxyService],
})
export class ProxyModule implements NestModule {
  // Example: http://localhost:3003/api/v1/auth/* -> http://localhost:3000/*
  configure(consumer: MiddlewareConsumer) {
    const authPath = process.env.AUTH_SOURCE_PATH + '*';
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: authPath, method: RequestMethod.ALL });
  }
}
