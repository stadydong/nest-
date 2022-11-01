import { Injectable } from "@nestjs/common";
import { DataSource, QueryRunner } from "typeorm";


@Injectable()
export class GlobalService{
  constructor(private readonly dataSource:DataSource){}
  //获取一个事务查询
  getQueryRunner():QueryRunner{
    const QeuryRunner = this.dataSource.createQueryRunner()
    QeuryRunner.connect()
    QeuryRunner.startTransaction()
    return QeuryRunner
  }
}