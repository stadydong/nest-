import { Global, Inject, Module } from "@nestjs/common";
import { GlobalService } from "./global.service";


@Global()
@Module({
  exports:[GlobalService],
  providers:[GlobalService]
})
export class GlobalModule{

}