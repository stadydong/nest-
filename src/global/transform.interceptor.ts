import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import {Response} from 'express'
import { map} from "rxjs";


export class TransformInterceptor implements NestInterceptor{
  intercept(context:ExecutionContext,next:CallHandler){
    const ctx = context.switchToHttp()
    const req = ctx.getRequest<Request>()
    const res = ctx.getResponse<Response>()
    //next.handle()  会返回Observable
    return next.handle().pipe(map(data=>({
      data,
      url:req.url,
      success:true,
    })))
  }
}