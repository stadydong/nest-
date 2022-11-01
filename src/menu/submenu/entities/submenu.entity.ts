import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Menu } from "../../entities/menu.entity";


@Entity()
export class SubMenu {
  @PrimaryGeneratedColumn()
  submenu_id:number
  @Column({type:"varchar",length:20,unique:true})
  submenu_title:string
  @Column({type:"varchar"})
  submenu_url:string
  @UpdateDateColumn()
  updateDate:Date
  @CreateDateColumn()
  createDate:Date
  @ManyToOne(type=>Menu,menu=>menu.submenu_list)
  @JoinColumn({name:"menu"})
  menu:Menu
}
