
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RoleType } from "./emuns";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  role_id:number
  @Column({
    type:"enum",
    enum:RoleType,
    default:RoleType.Default
  })
  role_name:string
}
