import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetAllDishParamDto {
  @ApiProperty({ description: 'Restaurant id' })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
