import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DeleteDishByIdParamDto {
  @ApiProperty({ description: 'Restaurant Id' })
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Dish Id want to update' })
  @IsNotEmpty()
  @IsUUID()
  dish_id: string;
}
