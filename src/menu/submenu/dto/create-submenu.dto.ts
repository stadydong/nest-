import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsString } from "class-validator"

export class CreateSubmenuDto {
  @ApiProperty({default:"系统管理",description:"Menu的标题",required:true})
  @IsString({message:"主菜单[Menu]的标题必须提供"})
  menu_title:string
  @ApiProperty({default:"菜单管理",description:"菜单管理的标题"})
  @IsString({message:"submenu_title为字符串长度为20"})
  submenu_title:string
  @ApiProperty({default:"system/menu",description:"子菜单管理的对应的路由路径"})
  @IsString({message:"submenu_url为字符串"})
  submenu_url:string
}
