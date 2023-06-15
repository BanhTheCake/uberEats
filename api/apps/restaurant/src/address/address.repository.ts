import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantAddressEntity } from '../entity/restaurant_adress.entity';

@Injectable()
export class AddressRepository {
  constructor(
    @InjectRepository(RestaurantAddressEntity)
    private restaRepository: Repository<RestaurantAddressEntity>,
  ) {}

  async createOne(data: DeepPartial<RestaurantAddressEntity>) {
    const newRestaurantAddress = this.restaRepository.create(data);
    await this.restaRepository.save(newRestaurantAddress);
    return this.restaRepository.findOne({
      where: { id: newRestaurantAddress.id },
    });
  }
}
