import { Injectable } from '@nestjs/common';
import { CreateNewRequestDto } from './dto/create-new-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantEntity } from '../entity/restaurant.entity';
import { Repository, DataSource, QueryRunner } from 'typeorm';
import { RestaurantAddressEntity } from '../entity/restaurant_adress.entity';

@Injectable()
export class RestaServices {
  constructor(
    @InjectRepository(RestaurantEntity)
    private restaRepository: Repository<RestaurantEntity>,
    @InjectRepository(RestaurantAddressEntity)
    private addressRepository: Repository<RestaurantAddressEntity>,
    private dataSource: DataSource,
  ) {}

  async createQueryRunner(): Promise<QueryRunner> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    return queryRunner;
  }

  async createNew(data: CreateNewRequestDto, ownerId: string) {
    // Create transactions
    const queryRunner = await this.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const restaurant = this.restaRepository.create({
        ...data,
        owner_id: ownerId,
      });
      await queryRunner.manager
        .getRepository(RestaurantEntity)
        .save(restaurant);
      const address = this.addressRepository.create({
        ...data.address,
        restaurant,
      });
      await queryRunner.manager
        .getRepository(RestaurantAddressEntity)
        .save(address);

      // Store data into database
      await queryRunner.commitTransaction();

      return this.restaRepository.findOne({
        where: { id: restaurant.id },
        relations: {
          address: true,
        },
      });
    } catch (error) {
      // Roll back when error
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // release query runner
      await queryRunner.release();
    }
  }
}
