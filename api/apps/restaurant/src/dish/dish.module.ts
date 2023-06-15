import { Module } from '@nestjs/common';
import { DishController } from './dish.controller';
import { DishServices } from './dish.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishEntity } from '../entity/dish.entity';
import { RestaurantEntity } from '../entity/restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DishEntity, RestaurantEntity])],
  controllers: [DishController],
  providers: [DishServices],
})
export class DishModule {}
