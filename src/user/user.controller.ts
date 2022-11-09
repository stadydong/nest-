import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { FindAllUserDto } from './dto/findAll-user.dto';
import { ApiCreatedResponse, ApiOperation, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags("User")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //添加新用户
  @Post()
  @ApiOperation({summary:"添加新用户",description:"添加新用户"})
  create(@Body() createUserDto:CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @ApiOperation({summary:"查找一个用户",description:"传入一个id"})
  @ApiParam({name:"id",description:"要查找的id的值",type:Number})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

//查询所有
  @Post("list")
  @ApiOperation({summary:"查找所有用户",description:"take为多少条,skip偏移量"})
  findAll(@Body() body:FindAllUserDto) {
    let take = body.take
    let skip = body.skip
    if(!skip) skip = 0
    if(!take) take = 30
    // return this.userService.findAll(skip);
    return this.userService.findAll(skip,take);
  }



  @Patch(':id')
  @ApiOperation({summary:"更新一个用户",description:"传入一个id和要更新的用户数据"})
  update( @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({summary:"删除一个用户",description:"通过id删除一个用户"})
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
  @Post("like")
  like(){
    return this.userService.like()
  }
}
