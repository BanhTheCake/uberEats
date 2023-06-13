import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';

describe('RestaurantController', () => {
  let restaurantController: RestaurantController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantController],
      providers: [RestaurantService],
    }).compile();

    restaurantController = app.get<RestaurantController>(RestaurantController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(restaurantController.getHello()).toBe('Hello World!');
    });
  });
});
