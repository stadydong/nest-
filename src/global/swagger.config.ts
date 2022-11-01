import { INestApplication } from '@nestjs/common'
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger'
const config = new DocumentBuilder()
.setTitle("后台管理系统Api(Nest)")
.setVersion("1.0")
.setDescription("接口测试")
.addTag("cats")
.build()

export const SwaggerConfig = (app:INestApplication)=>{
  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup("api",app,document)
}