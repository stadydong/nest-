import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { MySecret } from './constants';
import { JWTStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  providers: [AuthService,LocalStrategy,JWTStrategy],
  imports:[
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret:MySecret,
      signOptions:{
        expiresIn:'30days'     //60秒过期
      }
    })
  ],
  exports:[AuthService]     //让其他模块可以使用
})
export class AuthModule {}
