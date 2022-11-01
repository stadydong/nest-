import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubmenuService } from './submenu.service';
import { CreateSubmenuDto } from './dto/create-submenu.dto';
import { UpdateSubmenuDto } from './dto/update-submenu.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("二级菜单管理")
@Controller('submenu')
export class SubmenuController {
  constructor(private readonly submenuService: SubmenuService) {}
  @ApiOperation({summary:"新增子菜单",description:"必须提供menu的id"})
  @Post()
  create(@Body() createSubmenuDto: CreateSubmenuDto) {
    return this.submenuService.create(createSubmenuDto);
  }

  @Get()
  findAll() {
    return this.submenuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.submenuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubmenuDto: UpdateSubmenuDto) {
    return this.submenuService.update(+id, updateSubmenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.submenuService.remove(+id);
  }
}
