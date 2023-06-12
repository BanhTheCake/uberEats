import { ApiProperty } from '@nestjs/swagger';

export class GetUserResponse {
  @ApiProperty({
    example: '9b94926e-6348-4434-a4f9-de82ec766e45',
  })
  id: string;

  @ApiProperty({
    example: 'Banh',
  })
  firstName: string;

  @ApiProperty({
    example: 'TheFox',
  })
  lastName: string;

  @ApiProperty({
    example: 'banhTheCake',
  })
  username: string;

  @ApiProperty({
    example: new Date().toISOString(),
  })
  created_at: Date;

  @ApiProperty({
    example: new Date().toISOString(),
  })
  updated_at: Date;
}
