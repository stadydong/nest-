import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GlobalService } from 'src/global/global_module/global.service';
import { Role } from 'src/role/entities/role.entity';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity'
import { UserInfo } from './entities/userInfo.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository:Repository<User>,
    private readonly globalService:GlobalService
  ){}
  async create(createUserDto:CreateUserDto) {
    const user_account = await this.nameRepetition(createUserDto.username)
    //判断用户名是否存在
    if(user_account) return "用户名已经存在"
    //获取一个事务查询器
    const queryRunner = this.globalService.getQueryRunner()
    try {
      let role = new Role()
      await queryRunner.manager.save(Role,role)

      let userInfo = new UserInfo()
      userInfo.phone = createUserDto.phone
      userInfo.role = role
      await queryRunner.manager.save(UserInfo,userInfo);   

      let user = new User()
      user.password = createUserDto.password
      user.username = createUserDto.username
      user.userInfo = userInfo
      await queryRunner.manager.save(User,user);
      await queryRunner.commitTransaction();    //提交事务
    } catch (err) {  
      await queryRunner.rollbackTransaction();  //因为我们有错误，让我们回滚我们所做的更改
    return "添加错误"
    } finally {
      await queryRunner.release();      //关闭事务
    }
    return "添加用户成功"
  }
  //用来判断用户名是否重复
  async nameRepetition(username:any):Promise<null | User>{
    return await this.userRepository.findOne({where:{username}})
  }

  async findOne(id: number) {
    let info = await this.userRepository.find({
    select:{user_id:true,username:true},
    relations:{userInfo:{
      role:true,
    }},
    where:{user_id:id}
    })
    // if(info.length<1) return "该id没有数据"
    
    return {
      user:info[0]
    };
  }

  async findAll(skip:number,take?:number) {
    const result = await this.userRepository.find({
    select:{user_id:true,username:true},
    relations:{userInfo:{role:true}},
    take,
    skip
  })
  const total = await this.userRepository.count()   //总记录条数
    return {
      user:result,
      total
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userOne = await this.findOne(id)
    if(!userOne.user) return "数据不存在"
    
    //判断用户名是否重复
    const user_account = await this.nameRepetition(updateUserDto.username)

    if(user_account){ //改用户名如果有数据   则判断这条数据是不是自己如果不是则用户名不能重复   
      if(!(user_account.user_id===id)) return "用户名重复" 
    }


const QueryRunner = this.globalService.getQueryRunner()
try {
  await QueryRunner.manager.update(User,{user_id:id},{
    username:updateUserDto.username,
    password:updateUserDto.password,
  })
  let userInfo_id = userOne.user.userInfo.userInfo_id
  await QueryRunner.manager.update(UserInfo,{userInfo_id},{
    phone:updateUserDto.phone
  })
  await QueryRunner.commitTransaction()   //提交事务
} catch (error) {
  await QueryRunner.rollbackTransaction()  //回滚操作
  return "更新错误"
}finally{
  await QueryRunner.release() //关闭事务     
} 
    return "更新成功";
  }

  async remove(id: number) {
    const user_account = await this.findOne(id)
    if(!user_account.user)  return "没有该条数据"
    const QueryRunner = this.globalService.getQueryRunner()
    try {                              //要操作的实体,条件
      await QueryRunner.manager.delete(User,{user_id:id})
      await QueryRunner.commitTransaction()
    } catch (error) {
      await QueryRunner.rollbackTransaction()
    }finally{
      await QueryRunner.release()
    }
    return "删除成功";
  }
  async like(){
    return await this.userRepository.find({
      where:{
        username:Like(`as%`)
      }
    })
  }
}
