import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Menu } from '../entities/menu.entity';
import { CreateSubmenuDto } from './dto/create-submenu.dto';
import { UpdateSubmenuDto } from './dto/update-submenu.dto';
import { SubMenu } from './entities/submenu.entity';

@Injectable()
export class SubmenuService {
  constructor(
    private readonly dataSource:DataSource
  ){}
  async create(createSubmenuDto: CreateSubmenuDto) {
    const {menu_title,submenu_url,submenu_title} = createSubmenuDto
      const menu = await this.dataSource.getRepository(Menu).createQueryBuilder("menu").where("menu.menu_title = :menu_title",{menu_title}).getOne()
      if(!menu?.menu_id) return "没有该标题的主菜单"
      const result:SubMenu = await this.findTitleOne(submenu_title)     
      if(result?.submenu_title) return "子菜单标题重复"
      
      const submenu = new SubMenu()
      submenu.submenu_title = submenu_title
      submenu.submenu_url = submenu_url
      submenu.menu = menu  
        
    this.dataSource.transaction(async manager=>{
      await manager.save(submenu)
    })
    return '新增子菜单成功';
  }

  findAll() {
    return `This action returns all submenu`;
  }
  findTitleOne(submenu_title){
    return this.dataSource.getRepository(SubMenu).createQueryBuilder("submenu").where("submenu.submenu_title = :submenu_title",{submenu_title}).getOne()
  }
  findOne(id: number) {
    return `This action returns a #${id} submenu`;
  }

  update(id: number, updateSubmenuDto: UpdateSubmenuDto) {
    return `This action updates a #${id} submenu`;
  }

  remove(id: number) {
    return `This action removes a #${id} submenu`;
  }
}
