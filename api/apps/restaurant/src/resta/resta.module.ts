import { Module } from '@nestjs/common';
import { RestaController } from './resta.controller';
import { RestaServices } from './resta.services';
import { RestaRepository } from './resta.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from '../entity/restaurant.entity';
import { AuthCommonModule } from '@app/shared';
import { AddressModule } from '../address/address.module';
import { RestaurantAddressEntity } from '../entity/restaurant_adress.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RestaurantEntity, RestaurantAddressEntity]),
    AuthCommonModule,
    AddressModule,
  ],
  controllers: [RestaController],
  providers: [RestaServices, RestaRepository],
})
export class RestaModule {}
