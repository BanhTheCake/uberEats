import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { DatabaseModule, RabbitmqModule, AuthCommonModule } from '@app/shared';
import { RestaurantEntity } from './entity/restaurant.entity';
import { RestaurantAddressEntity } from './entity/restaurant_adress.entity';
import { DishEntity } from './entity/dish.entity';
import { RestaModule } from './resta/resta.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/restaurant/.env',
    }),
    DatabaseModule.register([
      RestaurantEntity,
      RestaurantAddressEntity,
      DishEntity,
    ]),
    RabbitmqModule.register('AUTH_SERVICES', 'auth-query'),
    RestaModule,
    AddressModule,
  ],
  controllers: [],
  providers: [],
})
export class RestaurantModule {}
