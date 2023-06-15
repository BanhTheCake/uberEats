import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateNewDishParamDto {
  @ApiProperty({ description: 'Restaurant id' })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
