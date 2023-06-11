import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequestDto {
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

  @ApiProperty({
    example: 'banh',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'theFox',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;
}
