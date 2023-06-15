import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class AddressRequestDto {
  @ApiProperty({ example: '2/12/28' })
  @IsNotEmpty()
  @IsString()
  house_number: string;

  @ApiProperty({ example: 'Ngu Binh' })
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty({ example: 'TTH' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ example: 'An Cuu' })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({ example: 'Viet Nam' })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({ example: '10001' })
  @IsNotEmpty()
  @IsString()
  pin_code: string;
}
export class CreateNewRequestDto {
  @ApiProperty({ example: 'BanhTheRestaurant' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'BanhTheDescription' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 'https://github.com/typestack/class-validator',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  website_url: string;

  @ApiProperty({ example: 'facebook.com', required: false })
  @IsOptional()
  social_links!: any;

  @ApiProperty({ example: 'banhTheCuisine' })
  @IsNotEmpty()
  @IsString()
  cuisine: string;

  @ApiProperty({ example: 12 })
  @IsNotEmpty()
  @IsNumber()
  average_price!: number;

  @ApiProperty({ example: 5, required: false })
  @IsOptional()
  @IsNumber()
  average_rating: number;

  @ApiProperty({ example: '11' })
  @IsNotEmpty()
  @IsNumberString()
  latitude: string;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  is_available: string;

  @ApiProperty({ example: '15' })
  @IsNotEmpty()
  @IsNumberString()
  longitude: string;

  @ApiProperty({ example: '0907102032', required: false })
  @IsOptional()
  @IsString()
  contact_no: string;

  @ApiProperty({ example: 'Tomato is potato', required: false })
  @IsOptional()
  @IsString()
  banner: string;

  @ApiProperty({ example: 'Uber', required: false })
  @IsOptional()
  @IsString()
  delivery_options: string;

  @ApiProperty({ example: 'shoppe', required: false })
  @IsOptional()
  @IsString()
  pickup_options: string;

  @ApiProperty({ example: '6/15/2023' })
  @IsNotEmpty()
  @IsString()
  opens_at: string;

  @ApiProperty({ example: '6/16/2023' })
  @IsNotEmpty()
  @IsString()
  closes_at: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AddressRequestDto)
  address: AddressRequestDto;
}
