import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { SubMenu } from './submenu/entities/submenu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private readonly menuRepository:Repository<Menu>,
    private dataSource:DataSource
    ){}
  async create(createMenuDto: CreateMenuDto) {
    const MenuData = await this.findTypeOne(createMenuDto.type)
    if(MenuData.length>0){
      return "type已经存在"
    }
    const MenuData2 = await this.findTitleOne(createMenuDto.menu_title)
    if(MenuData2.length>0){
      return "title已经存在"
    }
    const menu = new Menu()
    menu.menu_img = createMenuDto.menu_img
    menu.menu_title = createMenuDto.menu_title
    menu.menu_url = createMenuDto.menu_url
    menu.type = createMenuDto.type
    await this.dataSource.transaction(async (manager)=>{
      await manager.save(menu)
    })
    // this.dataSource

    // submenu.
    return 'This action adds a new menu';
  }
  async findAll() {
    const result = await this.menuRepository.find({relations:{submenu_list:true}})
    // console.log(result);
    
    return result;
  }
  findTypeOne(type){
    return this.menuRepository.find({where:{
      type
    }})
  }
  findTitleOne(menu_title){
    return this.menuRepository.find({where:{
      menu_title
    }})
  }
  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
