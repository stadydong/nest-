import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository:Repository<Role>
  ){}
  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  async findAll(skip:number,take:number) {
    const result = await this.roleRepository.find({skip,take})
    return result;
  }

  findOne(id: number) {
    return this.roleRepository.findOne({where:{role_id:id}})
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id)
    if(!role) return "该id没有数据"
    if(role.role_name === updateRoleDto.role_name) return "角色没有被修改"
    role.role_name = updateRoleDto.role_name
    await this.roleRepository.update(id,role)
    return "更新成功";
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
