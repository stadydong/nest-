import { Module } from '@nestjs/common';
import { SubmenuService } from './submenu.service';
import { SubmenuController } from './submenu.controller';

@Module({
  controllers: [SubmenuController],
  providers: [SubmenuService],
})
export class SubmenuModule {}
