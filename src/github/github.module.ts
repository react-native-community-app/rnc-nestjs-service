import { Module } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubController } from './github.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
      baseURL: "https://api.github.com",
      headers: {
        Accept: "application/vnd.github+json"
      }
    }),
    JwtModule.register({})
  ],
  controllers: [GithubController],
  providers: [GithubService],
})
export class GithubModule { }
