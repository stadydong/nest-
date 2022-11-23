import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request,Response } from 'express'

import { Reflector } from "@nestjs/core";
import { User_Type } from "src/auth/types";


@Injectable()
export class VerifyRole implements CanActivate{
  constructor(
    private reflector:Reflector
  ){}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp()
    const request = ctx.getRequest<Request>()
    const role = this.reflector.get<string[]>("roles",context.getHandler())
    const user = request.user as User_Type 

    const response = ctx.getResponse<Response>()
    //验证成功
    //查找该角色是否对应
    return role.includes(user.role.role_name)
  }
}