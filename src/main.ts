import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { useContainer, ValidationError } from 'class-validator';
import { normalizeValidationError } from './common/utility/exception.utility';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  // Global Validation Custom
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        if (errors.length > 0) throw new BadRequestException(normalizeValidationError(errors));
      },
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // if (process.env.ENABLE_SWAGGER == 'true') {
    const documentApiConfig = new DocumentBuilder()
      .setTitle('NEST API')
      .setDescription('Boiler plate Nest')
      .setVersion('1.0')
      // .addBearerAuth()
      .build();
    const documentApi = SwaggerModule.createDocument(app, documentApiConfig);
    SwaggerModule.setup('/', app, documentApi);
  // }
  app.enableCors();
  // app.use(
  //   session({
  //     secret: 'my-secret',
  //     resave: false,
  //     saveUninitialized: false,
  //   }),
  // )
  await app.listen(3000);
}
bootstrap();
