import { Module } from '@nestjs/common';
import { GithubModule } from './github/github.module';
import { ConfigModule } from '@nestjs/config';
import configuration, { validationSchema } from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      load: [configuration],
      validationSchema,
      isGlobal: true
    }),
    GithubModule
  ],
})
export class AppModule { }
