import { Body, Controller, Get, Headers, Post, Req, Res, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Permission } from './entities/permission.entity';
import { VerifyRole } from './guards/VelifyRole';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService:AuthService,
    @InjectRepository(Permission) private readonly permission:Repository<Permission>,
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
  @Post("permission")
  async addPS(){
    /*
    //普通用户
    const permission1 = new Permission()
    permission1.role_name = RoleType.Default
    permission1.menuList = JSON.stringify([14])
    permission1.des = "只能有非管理的页面"
    //管理员
    const permission2 = new Permission()
    permission2.role_name = RoleType.Two
    permission2.menuList = JSON.stringify([1,3,5,8,10,14])
    permission2.des = "没有角色管理和菜单管理"
    //超管
    const permission3 = new Permission()
    permission3.role_name = RoleType.Three
    permission3.menuList = JSON.stringify([1,2,3,4,5,8,10,14])
    permission3.des = "所有权限"
    await this.permission.manager.save(permission1)
    await this.permission.manager.save(permission2)
    await this.permission.manager.save(permission3)
    */
    return "添加角色权限表成功"
  }

}
