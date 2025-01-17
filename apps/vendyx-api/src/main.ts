import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

import { GlobalExceptionFilter } from './api/shared/filters/global-exception.filter';
import { HttpExceptionFilter } from './api/shared/filters/http-exception.filter';
import { clsMiddleware } from './api/shared/middlewares/cls.middleware';
import { AppModule } from './app.module';
import { AuthService } from './auth/auth.service';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true // Required for Stripe webhook
  });

  const authService = app.get(AuthService);
  const configService = app.get(ConfigService);

  app.use(clsMiddleware(authService));
  app.useGlobalFilters(
    new GlobalExceptionFilter(),
    new HttpExceptionFilter(),
    new PrismaClientExceptionFilter()
  );

  await app.listen(configService.get('PORT'));
  Logger.log(`Server running on ${await app.getUrl()}`, 'Bootstrap');
}
bootstrap();
