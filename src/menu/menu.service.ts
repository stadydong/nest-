import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User_Type } from 'src/auth/types';
import { Permission } from 'src/entities/permission.entity';
import { DataSource, In, Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { MenuTree } from './types';



@Injectable()
export class MenuService {
  menus: Menu;
  constructor(
    @InjectRepository(Menu) private readonly menuRepository:Repository<Menu>,
    private readonly dataSource:DataSource
    ){
      this.menus = null
    }
  async create(createMenuDto: CreateMenuDto) {
    const {menu_title,menu_url,icon,parent_id,type} = createMenuDto
    if(await this.menuRepository.findOneBy({menu_url})) return "创建菜单重复"
    const menu = new Menu()
    menu.menu_title = menu_title 
    menu.menu_url = menu_url
    menu.icon = icon
    menu.type = type
    if(parent_id){
     let parentMenu = await this.menuRepository.findOneBy({menu_id:parent_id})
      if(!parentMenu) return "没有该父级菜单"
      menu.parent_id = parentMenu.menu_id
      menu.viewPath = menu_url

      if(type===1 && parentMenu.type!=0) return "菜单里不能存放菜单"
    }
    await this.menuRepository.manager.save(menu)
    return "创建成功";
  }
  /**
   * 数据后面需要根据角色所对应的菜单进行查询
   */
  async findAll(user:User_Type) {
    const { role_name } = user.role 
    const permission = await this.dataSource.manager.findOne(Permission,{where:{role_name}})
    let menuAll
    if(permission.des == "所有权限"){
      menuAll = await this.menuRepository.find()
    }else{
      menuAll = await this.menuRepository.find({where:{menu_id:In(JSON.parse(permission.menuList))}})
    }
    return this.setChildren(menuAll,0)
  }
  /**
   * 对单条数据进行查询
   */
  findOne(id: number):Promise<Menu | null> {
    return this.menuRepository.findOneBy({menu_id:id});
  }
  /**
   * 对菜单进行递归格式化成树结构
   */
  setChildren(menu:Menu[],pid:number){
    let list:MenuTree[] = []
    for (const item of menu) {  
      if(item.parent_id === pid){
        list.push({...item,children:this.setChildren(menu,item.menu_id)})
      }
    }
    return list
  }
  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const menu = await this.findOne(id)
    if(!menu){ return "菜单不存在"}
    if(updateMenuDto.parent_id && updateMenuDto.parent_id != 0){
      let parentMenu = await this.menuRepository.findOne({where:{menu_id:updateMenuDto.parent_id}})
      if(!parentMenu) return "父级菜单不存在"
      if(parentMenu.type === 1) return "菜单里不能存放菜单"
      menu.parent_id = parentMenu.menu_id
    }
    //菜单路径是唯一值
    let findUrl = await this.menuRepository.findOneBy({menu_url:updateMenuDto.menu_url})
    if(!(findUrl.menu_id === menu.menu_id)) return "菜单路径重复"
    menu.menu_title = updateMenuDto.menu_title
    menu.icon = updateMenuDto.icon
    menu.type = updateMenuDto.type
    menu.menu_url = updateMenuDto.menu_url
    await this.menuRepository.update({menu_id:id},menu)
    return "更新成功"
  }
  //树结构转成扁平化
  setMenuList(menu:MenuTree,res:MenuTree[]=[]):MenuTree[]{
    res.push(menu)
      if(menu.children.length!=0){
        for (const iterator of menu.children) {
          this.setMenuList(iterator,res)
        }
      }
    return res
  }
  async remove(id: number) {
    // throw new HttpException({status:HttpStatus.NOT_FOUND,error:"数据有误"},HttpStatus.NOT_FOUND)
    // return 
    let root:MenuTree = await this.findOne(id)
    if(!root) throw new HttpException({status:HttpStatus.NOT_FOUND,error:"没有该菜单",meessage:["没有该菜单"]},HttpStatus.NOT_FOUND)
    //查找所有树结构
    const menuList = await this.menuRepository.find()
  //查找该菜单所有子树
    let MenuTree = this.setChildren(menuList,id)
    root.children = MenuTree
    //对树结构进行扁平化转换
    const menu = this.setMenuList(root)
    //存放id的列表
    let IdList:number[] = []
    for (const iterator of menu) {
      IdList.push(iterator.menu_id)
    }
    await this.menuRepository.delete(IdList)
    return "删除成功"
    
  }
}
