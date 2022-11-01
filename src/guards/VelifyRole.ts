import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request,Response } from 'express'
import { Repository } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Reflector } from "@nestjs/core";


@Injectable()
export class VerifyRole implements CanActivate{
  constructor(
    private reflector:Reflector
  ){}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // throw new Error("Method not implemented.");
    const ctx = context.switchToHttp()
    const request = ctx.getRequest<Request>()
    const role = this.reflector.get<string[]>("roles",context.getHandler)
    console.log(role);
    
    // console.log(request.user);
    // context.getHandler()
    const response = ctx.getResponse<Response>()
    //验证成功
    return true
  }
}