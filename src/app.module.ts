import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { MenuModule } from './menu/menu.module';
import { GlobalModule } from './global/global_module/global.module';
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path';


@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath:join(__dirname,"..","public")
    // }),
    AuthModule,TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'system',
    synchronize: true,
    autoLoadEntities:true,
    retryAttempts:10,
    retryDelay:50,
    // entities: [__dirname + '/../**/*.entity.js']
  }), UserModule, RoleModule, MenuModule, GlobalModule],
  exports:[TypeOrmModule],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
