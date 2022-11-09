import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  // @ApiProperty({name:"role_id",default:8})
  // @IsNumber({},{message:"id为number"})
  // role_id:number
}
