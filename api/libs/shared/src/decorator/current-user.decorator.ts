import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    if (ctx.getType() === 'http') {
      const request: Request = ctx.switchToHttp().getRequest();
      return request.user;
    }
    if (ctx.getType() === 'rpc') {
      const data = ctx.switchToRpc().getData();
      return data.user;
    }
    return null;
  },
);
