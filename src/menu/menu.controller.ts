import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto} from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Admin } from 'src/global/user.gruad';
import { VerifyRole } from 'src/guards/VelifyRole';
@ApiTags("菜单管理")
@Controller('menu')
//全部进行token验证
@UseGuards(AuthGuard("jwt"),VerifyRole)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @ApiOperation({summary:"新增menu",description:"单独新增"})
  @Admin(["超级管理员"])
  @Post()
  //主菜单增加
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }
  @Admin(["普通用户","管理员","超级管理员"])
  @Get()
  findAll(@Req() req) {
    return this.menuService.findAll(req.user)
  }
  @Admin(["超级管理员"])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }
  @Admin(["超级管理员"])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }
  @Admin(["超级管理员"])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
