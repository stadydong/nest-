
import { type } from "os";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, UpdateDateColumn } from "typeorm";
import { MENU_TYPE } from "../types";


@Entity()

export class Menu {
  @PrimaryGeneratedColumn()
  menu_id:number
  @Column({type:"varchar",length:50})
  menu_title:string
  //充当索引
  @Column({type:"varchar",nullable:true,unique:true})
  menu_url:string
  //icon
  @Column({type:"varchar",nullable:true})
  icon:string
  @UpdateDateColumn()
  updateDate:Date
  @CreateDateColumn()
  createDate:Date
  @Column({type:"varchar",nullable:true})
  viewPath:string
  @Column({type:"enum",enum:MENU_TYPE})
  type:MENU_TYPE
  @Column({name:"parent_id",default:0})
  parent_id:number
}
