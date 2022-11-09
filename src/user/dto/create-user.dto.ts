import { ApiProperty } from "@nestjs/swagger"
import { IsAlphanumeric, IsByteLength, IsNotEmpty, IsString, Length } from "class-validator"


export class CreateUserDto {
  @ApiProperty({name:"username",default:"xiaoming223"})
  @IsNotEmpty({message:"数据不能为空"})
  @Length(6,20,{
    message:"账号长度在6-20之间"
  })
  @IsAlphanumeric("en-HK",{message:"只能为字母或数字"})   //en-HK 英语里的香港变种
  username:string
  @ApiProperty({name:"password",default:"123456"})
  @Length(6,20,{
    message:"密码长度在6-20个之间"
  })
  @IsAlphanumeric("en-HK",{message:"只能为字母或数字"})   //en-HK 英语里的香港变种
  @IsNotEmpty({message:"数据不能为空"})
  password:string
  @ApiProperty({name:"phone",default:"13733557781"})
  @IsString({message:"手机号码必需是字符串"})
  @IsNotEmpty({message:"手机号码不能为空"})
  phone:string
}
