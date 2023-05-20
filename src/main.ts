import * as dotenv from "dotenv";
dotenv.config()
import { NestFactory } from '@nestjs/core';
import * as http from 'http';
import { createWebSocketServer } from './configs/websocket.server';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { Environment } from './common/enums/environment-variables.enum';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ConfigService } from "@nestjs/config";


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    bufferLogs: true,
  });
  const server = http.createServer(app.getHttpAdapter().getInstance());
  createWebSocketServer(server);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  const environment = process.env.NODE_ENV as Environment;
  app.use(helmet());
  // Setting the node process timezone
  process.env.TZ = 'Africa/Lagos';
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: environment !== Environment.PRODUCTION, // set to true on production
      transform: true,
      forbidUnknownValues: true,
      skipMissingProperties: false,
      stopAtFirstError: true,
      validationError: {
        target: false,
        value: false,
      },
      exceptionFactory: (validationErrors: ValidationError[] = []) =>
        new BadRequestException(validationErrors, 'Bad Request'),
    }),
  );
  // This will prefix our routes with api i.e http://localhost:4000/api/*
  app.setGlobalPrefix('api');
  // We configure the cross origins to allow requests from our frontend
  app.enableCors({
    //     origin: getAllowedOrigins(environment),
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(port);
}
bootstrap();