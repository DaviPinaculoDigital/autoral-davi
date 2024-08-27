import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './utils/response.interceptor';
import { AppErrorFilter } from './utils/errors/errors.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors( new ResponseInterceptor()) 
  app.useGlobalFilters(new AppErrorFilter());

  await app.listen(3003);
}
bootstrap();
