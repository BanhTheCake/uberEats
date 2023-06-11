import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LogoutRequestDto {
  @ApiProperty({
    example: '9b94926e-6348-4434-a4f9-de82ec766e45',
  })
  @IsNotEmpty()
  @IsString()
  id: string;
}
