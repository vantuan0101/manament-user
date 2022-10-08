import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Test BackEnd')
    .setDescription('Test Fresher Back end')
    .setVersion('1.0')
    .build();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // true = only validate fields that are defined in the DTO
    }),
  );
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
