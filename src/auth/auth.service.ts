import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import { userInfo } from 'os';

import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { User_Type } from './types';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository:Repository<User>,
    private readonly jwtService:JwtService
  ){}
  async validateUser(username:string,pwd:string){
    
    const user = (await this.userRepository.find({where:{username},select:{password:false},relations:{userInfo:{role:true}}}))[0]
    if(user.password === pwd){
      const userInfo ={
        username,
        user_id:user.user_id,
        role:user.userInfo.role
      } 
      return userInfo
    }
    //验证账号密码不通过
    return null
  }
  async login(user:User_Type){
    //user是一个 pyload
    const access_token = this.jwtService.sign(user)
    return {
      access_token,
      username:user.username,
      user_id:user.user_id,
    }
  }
}
