import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsOptional, IsString, Min,IsEmpty, IsNumber, IsEnum, IsNotEmpty } from "class-validator"
import { MENU_TYPE } from "../types"

export class CreateMenuDto {
  @ApiProperty({default:"系统管理",description:"菜单主标题标题"})
  @IsNotEmpty({message:"标题不为空"})
  @IsString({message:"menu_title为字符串长度为20"})
  menu_title:string
  @ApiProperty({default:"/system",description:"对应的路由路径"})
  @IsNotEmpty({message:"路径不能不为空"})
  @IsOptional()
  @IsString({message:"mmenu_url为字符串"})
  menu_url:string
  @ApiProperty({default:"icon/system_option.png",description:"icon的路径"})
  @IsOptional()
  @IsString({message:"icon为字符串"})
  icon:string
  @ApiProperty({default:1})
  @IsOptional()
  @IsInt({message:"参数parent值必须为整数"})
  @Min(0,{message:"参数parent值大于或等于0的整数"})
  parent_id:number
  @ApiProperty({default:0})
  @IsNotEmpty({message:"type不为空"})
  @IsEnum(MENU_TYPE,{message:"type值为1或0"})
  type:MENU_TYPE
}

