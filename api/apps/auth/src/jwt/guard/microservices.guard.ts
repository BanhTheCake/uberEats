import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class MicroservicesTokenGuard extends AuthGuard(
  'microservices/accessToken',
) {}
