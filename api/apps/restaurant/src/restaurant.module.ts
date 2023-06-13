import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { DatabaseModule } from '@app/shared';
import { RestaurantEntity } from './entity/restaurant.entity';
import { RestaurantAddressEntity } from './entity/restaurant_adress.entity';
import { DishEntity } from './entity/dish.entity';

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
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
