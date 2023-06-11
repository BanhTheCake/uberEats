import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Auth')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
};

export default setupSwagger;
