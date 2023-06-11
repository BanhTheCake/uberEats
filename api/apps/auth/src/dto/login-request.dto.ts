import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({
    example: 'banhTheCake',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'banhThePassword',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
