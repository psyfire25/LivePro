import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const { ValidationPipe } = await import('@nestjs/common');

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
const config = new DocumentBuilder()
  .setTitle('LivePro API')
  .setDescription('OpenAPI spec for LivePro')
  .setVersion('1.0.0')
  .build();
const doc = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('/docs', app, doc);
await app.listen(4000);
}
bootstrap();
