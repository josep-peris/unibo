import { NestFactory } from '@nestjs/core';
import { ValidationPipe, NestApplicationOptions, Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';
import { json, urlencoded } from 'express';
import { ConfigurationService } from './core/configuration/configuration.service';

async function bootstrap() {

  const appOptions: NestApplicationOptions = {
    bodyParser: true
  };

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    appOptions,
  );

  const config = app.get(ConfigurationService);

  app.use(json({ limit: '20mb' }));

  app.use(urlencoded({ extended: true, limit: '2mb' }));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    }),
  );

  app.enableCors();

  await app.listen(config.PORT);

  await app.getUrl().then((url) => {
    Logger.log(
      `🚀 ${config.APP_NAME} server is ready at ${url} || ''}`,
    );
  });
}
bootstrap();
