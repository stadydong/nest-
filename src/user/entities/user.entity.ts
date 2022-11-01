import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserInfo } from "./userInfo.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id:number
  @Column({
    type:"varchar",
    length:20,
    unique:true  //唯一值
  })
  username:string
  @Column({
    type:"varchar",
    length:20,
  })
  password:string
  @OneToOne(type=>UserInfo)
  @JoinColumn({name:"userInfo"})
  userInfo:UserInfo
  // @OneToOne(type=>Role)
  // @JoinColumn({name:"role_id"})
  // role_id:Role
  // @OneToOne(type=>Department)
  // @JoinColumn({name:"department_id"})
  // department_id:Department
}
