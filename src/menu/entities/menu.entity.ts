import { ApiExtension, ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SubMenu } from "../submenu/entities/submenu.entity";

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  menu_id:number
  @Column({type:"smallint",unique:true})
  type:number
  @Column({type:"varchar",length:20,unique:true})
  menu_title:string
  //充当索引
  @Column({type:"varchar"})
  menu_url:string
  //icon
  @Column({type:"varchar"})
  menu_img:string
  @UpdateDateColumn()
  updateDate:Date
  @CreateDateColumn()
  createDate:Date
  @OneToMany(type=>SubMenu,submenu=>submenu.menu)
  submenu_list:SubMenu[]
}
