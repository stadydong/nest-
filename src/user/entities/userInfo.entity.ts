import { Role } from "src/role/entities/role.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserInfo{
  @PrimaryGeneratedColumn()
  userInfo_id:number
  @CreateDateColumn()
  createTime:Date
  @UpdateDateColumn()
  updateTime:Date 
  @Column({type:"varchar"})
  phone:string
  @OneToOne(type=>Role)
  @JoinColumn({name:"role"})
  role:Role
}