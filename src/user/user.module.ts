import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserInfo } from './entities/userInfo.entity';
import { GlobalService } from 'src/global/global_module/global.service';



@Module({
  controllers: [UserController],
  providers: [UserService,GlobalService],
  imports:[TypeOrmModule.forFeature([User,UserInfo]),],
})
export class UserModule {}
