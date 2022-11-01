import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Request,Response } from 'express';

@Catch(HttpException)
export class Filter implements ExceptionFilter{
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const req = ctx.getRequest<Request>()
    const res = ctx.getResponse<Response>()
    const status = exception.getStatus()
    res.status(status).send({
      url:req.url,
      status,
      message:exception
    })
  }
}