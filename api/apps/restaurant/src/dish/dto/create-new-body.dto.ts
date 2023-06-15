import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateNewDishBodyDto {
  @ApiProperty({ example: 'BanhTheDish' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'BanhTheDesc' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'adventure' })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({ example: 'Fast-food' })
  @IsNotEmpty()
  @IsString()
  food_type: string;

  @ApiProperty({ example: ['potato', 'tomato'] })
  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  ingredients: string[];

  @ApiProperty({ example: ['https://www.facebook.com/'] })
  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @IsUrl({}, { each: true })
  thumbnails: string[];
}
