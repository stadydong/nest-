import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'

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
    
    const userInfo = await this.userRepository.findOneBy({username})
    console.log(userInfo);
    
    if(userInfo.password === pwd){
      //验证通过
      const { password,...user } = userInfo
      console.log(user);
      return user
    }
    //验证账号密码不通过

    
    return null
  }
  async login(user:User_Type){
    // await 
    console.log(user);
    
    const payload = {
      username:user.username,
      user_id:user.user_id,
      role_id:user.role_id,
      department_id:user.department_id
    }
    const access_token = this.jwtService.sign(payload)
    return {
      access_token,
      username:user.username,
      user_id:user.user_id,
    }
  }
}
