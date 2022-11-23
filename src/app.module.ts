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
import { Permission } from './entities/permission.entity';


@Module({
  imports: [
    AuthModule,TypeOrmModule.forRoot({
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'system',
    synchronize: true,
    autoLoadEntities:true,
    retryAttempts:10,
    retryDelay:50,
  }), UserModule, RoleModule, MenuModule, GlobalModule,TypeOrmModule.forFeature([Permission])],
  exports:[TypeOrmModule],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
