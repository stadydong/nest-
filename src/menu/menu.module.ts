import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { SubMenu } from './submenu/entities/submenu.entity';
import { SubmenuModule } from './submenu/submenu.module';

@Module({
  imports:[TypeOrmModule.forFeature([Menu,SubMenu]), SubmenuModule],
  controllers: [MenuController],
  providers: [MenuService]
})
export class MenuModule {}
