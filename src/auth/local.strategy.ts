import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(private readonly authService:AuthService){
    super()
  }
  async validate(username:string,password:string){
    if(username && password){
      username = username.toString()
      password = password.toString()
    }
    console.log("user");
    const user = await this.authService.validateUser(username,password)
    if(!user){
      throw new UnauthorizedException("请输入正确的账号或者密码")
    }
    console.log(user);
    
    return user
  }
}