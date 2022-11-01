import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { MySecret } from "./constants";
import { User_Type } from "./types";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy){
  constructor(){
    super({
      jwtFromRequest:ExtractJwt.fromHeader("token"),
      secretOrKey:MySecret,
      ignoreExpiration:false //忽略过期
    }as StrategyOptions)
  }
  async validate(payload:User_Type){
    // console.log("jwt validate");
    
    // console.log(payload);
    // console.log(new Date().getTime());
    
    return {
      username:payload.username,
      user_id:payload.user_id
    }
  }
}