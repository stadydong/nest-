import { Menu } from "./entities/menu.entity";

export interface MenuTree extends Menu{
  children?:MenuTree[]
}
export enum MENU_TYPE {
  DIRECTORY = 0,
  MENU = 1
}