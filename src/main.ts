import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Filter } from './global/filter.interceptor';
import { TransformInterceptor } from './global/transform.interceptor'
import { ValidationPipe }from '@nestjs/common'
import { SwaggerConfig } from './global/swagger.config'
import * as express from 'express'
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //swagger配置  路径在/api里
  SwaggerConfig(app)
  app.use(express.static(join(__dirname,"..","public")),)
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new Filter())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
