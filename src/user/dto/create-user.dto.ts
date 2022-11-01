import { IsByteLength, isByteLength, IsNotEmpty, IsString } from "class-validator"


export class CreateUserDto {
  @IsByteLength(6,20,{
    message:"账号长度在6-20个字符之间"
  })
  @IsNotEmpty({message:"数据不能为空"})
  username:string
  @IsByteLength(6,20,{
    message:"密码长度在6-20个字符之间"
  })
  @IsNotEmpty({message:"数据不能为空"})
  password:string
  @IsString({message:"手机号码必需是字符串"})
  @IsNotEmpty({message:"手机号码不能为空"})
  phone:string
}
