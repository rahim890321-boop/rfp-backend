import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // টপকোডারের শর্ত অনুযায়ী ভ্যালিডেশন পাইপ সেটআপ
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // সোয়াগার (Swagger) ডকুমেন্টেশন সেটআপ - যা তারা ডিটেইলসে চেয়েছে
  const config = new DocumentBuilder()
    .setTitle('RFP Proposal API')
    .setDescription('The Proposal Management API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
