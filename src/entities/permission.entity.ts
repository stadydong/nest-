import { RoleType } from "src/role/entities/emuns";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permission{
  @PrimaryGeneratedColumn()
  permission_id:number
  @Column({type:"enum",enum:RoleType})
  role_name:RoleType
  @Column({type:"varchar"})
  menuList:string
  @Column({type:"text"})
  des:string
}