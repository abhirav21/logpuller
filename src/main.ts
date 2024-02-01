import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'logpuller';
  setUpSwagger(`${globalPrefix}/api`, app);
  await app.listen(3000);
}
function setUpSwagger(docPrefix: string, app: any) {
  const options = new DocumentBuilder()
    .setTitle('Log Puller Apis')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });
  SwaggerModule.setup(docPrefix, app, document);
}
bootstrap();
