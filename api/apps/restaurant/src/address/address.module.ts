import { Module } from '@nestjs/common';
import { AddressServices } from './address.services';
import { AddressRepository } from './address.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantAddressEntity } from '../entity/restaurant_adress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantAddressEntity])],
  providers: [AddressServices, AddressRepository],
  exports: [AddressServices, AddressRepository],
})
export class AddressModule {}
