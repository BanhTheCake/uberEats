import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { Observable, catchError, tap } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject('AUTH_SERVICES') private authMicroservices: ClientProxy,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token = this.getTokenFromContext(context);
    if (!token) {
      throw new UnauthorizedException();
    }
    return this.authMicroservices
      .send(
        { cmd: 'verify' },
        {
          authentication: token,
        },
      )
      .pipe(
        tap((user: any) => {
          this.addUser(context, user);
        }),
        catchError(() => {
          throw new UnauthorizedException();
        }),
      );
  }

  getTokenFromContext(context: ExecutionContext) {
    if (context.getType() === 'http') {
      const request: Request = context.switchToHttp().getRequest();
      const token = this.getTokenFromReq(request);
      return token;
    }
    if (context.getType() === 'rpc') {
      const data = context.switchToRpc().getData();
      const token = data.authentication || data.Authentication;
      return token;
    }
  }

  getTokenFromReq(request: Request) {
    const tokenRaw =
      request.headers.authorization ||
      (request.headers.Authorization as string);
    if (!tokenRaw?.startsWith('Bearer')) {
      return null;
    }
    const token = tokenRaw.split(' ')[1];
    return token;
  }

  addUser(context: ExecutionContext, user: any) {
    if (context.getType() === 'http') {
      context.switchToHttp().getRequest().user = user;
    }
    if (context.getType() === 'rpc') {
      context.switchToRpc().getData().user = user;
    }
  }
}
