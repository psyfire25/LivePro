import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const { ValidationPipe } = await import('@nestjs/common');

  const app = await NestFactory.create(AppModule);
  // Broaden CORS in dev to cover any localhost port the Next app picks
  app.enableCors({ origin: true, credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('LivePro API')
    .setDescription('OpenAPI spec for LivePro')
    .setVersion('1.0.0')
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, doc);

  const port = process.env.PORT || 3333;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 API listening on http://localhost:${port}`);
}
bootstrap();
