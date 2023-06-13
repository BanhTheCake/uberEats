import { validateEnv } from '@app/shared';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createProxyMiddleware, RequestHandler } from 'http-proxy-middleware';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private proxy: RequestHandler;
  private logger = new Logger(AuthMiddleware.name);

  constructor(configServices: ConfigService) {
    const [AUTH_SERVICES_URL, AUTH_SOURCE_PATH, AUTH_REWRITE_PATH] =
      validateEnv(
        ['AUTH_SERVICES_URL', 'AUTH_SOURCE_PATH', 'AUTH_REWRITE_PATH'],
        configServices,
      );
    const sourcePath = '/api/v1/' + AUTH_SOURCE_PATH;
    const targetPath = AUTH_REWRITE_PATH;
    this.proxy = createProxyMiddleware({
      target: AUTH_SERVICES_URL,
      pathRewrite: {
        [sourcePath]: targetPath,
      },
      onProxyRes: (proxyRes, req, res) => {
        this.logger.log('URL: ', req.originalUrl);
        this.logger.log('STATE_CODE: ', proxyRes.statusCode);
      },
    });
  }

  use(req: any, res: any, next: (error?: any) => void) {
    console.log('hits middleware');
    this.proxy(req, res, next);
  }
}
