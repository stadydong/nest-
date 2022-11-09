import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { RoleType } from "../entities/emuns"
import { Role } from "../entities/role.entity"

export class CreateRoleDto {
  @ApiProperty({name:"role_name",default:RoleType.Two})
  @IsNotEmpty({message:"值不能为空"})
  @IsString({message:"类型字符串"})
  @IsEnum(RoleType,{message:"角色错误"})
  role_name:string
}
