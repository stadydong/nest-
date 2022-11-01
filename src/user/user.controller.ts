import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { FindAllUserDto } from './dto/findAll-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("User")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //添加新用户
  @Post()

  create(@Body() createUserDto:CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

//查询所有
  @Post("list")
  findAll(@Body() body:FindAllUserDto) {
    let take = body.take
    let skip = body.skip
    if(!skip) skip = 0
    if(!take) take = 30
    // return this.userService.findAll(skip);
    return this.userService.findAll(skip,take);
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
