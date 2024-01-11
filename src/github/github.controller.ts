import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { GithubService } from './github.service';
import { GetRepositoryReqDto, GetRepositoryReqSchema } from './dto/repository.dto';
import { GetRepositoriesListReqDto, GetRepositoriesListReqSchema } from './dto/repositories-list.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { NotFoundError, forkJoin } from 'rxjs';
import { SearcgRepositoriesReqDto as SearchRepositoriesReqDto, SearchRepositoriesReqSchema } from './dto/search-repositories.dto';

@ApiTags("GitHub")
@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) { }

  @Get("/repositories-list")
  @ApiQuery({ type: GetRepositoriesListReqSchema })
  getRepositoriesList(@Query() query: GetRepositoriesListReqDto) {
    return this.githubService.getRepositoriesList(query);
  }

  @Get("/search-repositories")
  @ApiQuery({ type: SearchRepositoriesReqSchema })
  searchRepositories(@Query() query: SearchRepositoriesReqDto) {
    return this.githubService.searchRepositories(query);
  }

  @Get("/repository")
  @ApiQuery({ type: GetRepositoryReqSchema })
  getRepository(@Query() query: GetRepositoryReqDto) {
    return this.githubService.getRepository(query);
  }
}
