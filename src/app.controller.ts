import { Body, Controller, Get, Headers, Post, Req, Res, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { VerifyRole } from './guards/VelifyRole';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService:AuthService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @UseGuards(AuthGuard("local"))
  @Post("login/account")
  getTest(@Req() req){

    
    return this.authService.login(req.user)
  }
  
  @Post("jwt")
  @SetMetadata("roles",["普通用户","管理员","超级管理员"])
  @UseGuards(AuthGuard("jwt"),VerifyRole)
  vdt(@Req() req){

    return req.user
  }


}
