import { ApiProperty } from '@nestjs/swagger';

export class AddressResponseDto {
  @ApiProperty({ example: '9f161617-c560-4bf0-8f03-9b43c9ea49a8' })
  id: string;

  @ApiProperty({ example: '2/12/28' })
  house_number: string;

  @ApiProperty({ example: 'Ngu Binh' })
  street: string;

  @ApiProperty({ example: 'TTH' })
  city: string;

  @ApiProperty({ example: 'An Cuu' })
  state: string;

  @ApiProperty({ example: 'Viet Nam' })
  country: string;

  @ApiProperty({ example: 'pin_code' })
  pin_code: string;

  @ApiProperty({ example: '2023-06-14T21:17:25.297Z' })
  created_at: string;

  @ApiProperty({ example: '2023-06-14T21:17:25.297Z' })
  updated_at: string;
}

export class CreateNewResponseDto {
  @ApiProperty({ example: '13fecaaa-69c8-43f3-991d-2a5fcb4e467b' })
  id: string;

  @ApiProperty({ example: 'BanhTheRestaurant' })
  name: string;

  @ApiProperty({ example: 'BanhTheDescription' })
  description: string;

  @ApiProperty({ example: 'a50cf7f8-b238-460e-b824-8e2c9ea21f4b' })
  owner_id: string;

  @ApiProperty({
    example: 'https://github.com/typestack/class-validator',
    nullable: true,
  })
  website_url?: string;

  @ApiProperty({ example: 'facebook.com', nullable: true, required: false })
  social_links?: any;

  @ApiProperty({ example: 'banhTheCuisine' })
  cuisine: string;

  @ApiProperty({ example: 12, nullable: true, required: false })
  average_price?: number;

  @ApiProperty({ example: 5, nullable: true, required: false })
  average_rating?: number;

  @ApiProperty({ example: '11' })
  latitude: string;

  @ApiProperty({ example: true })
  is_available: boolean;

  @ApiProperty({ example: '15' })
  longitude: string;

  @ApiProperty({ example: '0907102032', nullable: true, required: false })
  contact_no?: string;

  @ApiProperty({ example: 'Tomato is potato', nullable: true, required: false })
  banner?: string;

  @ApiProperty({ example: 'Uber', nullable: true, required: false })
  delivery_options?: string;

  @ApiProperty({ example: 'pickup_options', nullable: true, required: false })
  pickup_options?: string;

  @ApiProperty({ example: '2/2/2003' })
  opens_at: string;

  @ApiProperty({ example: '2/2/2003' })
  closes_at: string;

  @ApiProperty({ example: '2023-06-14T21:17:25.297Z' })
  created_at: string;

  @ApiProperty({ example: '2023-06-14T21:17:25.297Z' })
  updated_at: string;

  @ApiProperty()
  address: AddressResponseDto;
}
