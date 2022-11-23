import { SetMetadata } from "@nestjs/common";

export const Admin = (roles:string[]) => SetMetadata("roles",roles)

