import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsString } from "class-validator"

export class CreateMenuDto {
  @ApiProperty({default:1,description:"大于1的整数不能重复"})
  @IsInt({message:"type为整数"})
  type:number
  @ApiProperty({default:"系统管理",description:"管理的大标题"})
  @IsString({message:"menu_title为字符串长度为20"})
  menu_title:string
  @ApiProperty({default:"system",description:"对应的路由路径"})
  @IsString({message:"mmenu_url为字符串"})
  menu_url:string
  @ApiProperty({default:"icon/system_option.png",description:"icon的路径"})
  @IsString({message:"menu_img为字符串"})
  menu_img:string
}

