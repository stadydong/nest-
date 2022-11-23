import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { FindAllDto } from './dto/findall-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Admin } from 'src/global/user.gruad';
import { VerifyRole } from 'src/guards/VelifyRole';

@Controller('role')
@ApiTags("role")
@UseGuards(AuthGuard("jwt"),VerifyRole)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Admin(["超级管理员"])
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }
  @Admin(["超级管理员"])
  @Post("list")
  findAll(@Body() body:FindAllDto) {
    let take = body.take
    let skip = body.skip
    if(!skip) skip = 0
    if(!take) take = 30
    return this.roleService.findAll(skip,take);
  }
  @Admin(["超级管理员"])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }
  @Admin(["超级管理员"])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }
  @Admin(["超级管理员"])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
