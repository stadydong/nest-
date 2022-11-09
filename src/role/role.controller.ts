import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { FindAllDto } from './dto/findall-role.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('role')
@ApiTags("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Post("list")
  findAll(@Body() body:FindAllDto) {
    let take = body.take
    let skip = body.skip
    if(!skip) skip = 0
    if(!take) take = 30
    return this.roleService.findAll(skip,take);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
