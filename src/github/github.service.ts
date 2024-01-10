import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../config/configuration';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import * as fs from "fs";
import * as path from 'path';
import { REACT_NATIVE_COMMUNITY_NAME, GITHUBAPP_ORGANIZATION_NAME, GITHUBAPP_PRIVATEKEY_FILENAME } from '../constants';
import { App, Octokit } from 'octokit';
import { OrganizationInstallationDto } from './dto/organization-installation.dto';
import { lastValueFrom } from 'rxjs';
import { GetRepositoriesListReqDto, GetRepositoriesListResDto, } from './dto/repositories-list.dto';
import { GetRepositoryReqDto } from './dto/repository.dto';
import { PaginatedListDto } from '../common/dto/paginated.dto';
import { FindRepositoriesByNameReqDto, FindRepositoriesByNameResDto } from './dto/find-repositories-by-name.dto';

const gitHubAppPrivateKey = fs.readFileSync(
  path.join(process.cwd(), "resources", GITHUBAPP_PRIVATEKEY_FILENAME),
  { encoding: "utf-8" });

@Injectable()
export class GithubService {
  octokit: Octokit;

  constructor(
    private configService: ConfigService<EnvironmentVariables>,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService
  ) {
    this.init();
  }

  private async init() {
    const app = new App({
      appId: this.configService.get("GITHUB_APP_ID"),
      privateKey: gitHubAppPrivateKey
    });

    const result = await this.getInstallationId();
    this.octokit = await app.getInstallationOctokit(result.data.id)
  }

  private generateJWT() {
    return this.jwtService.sign({}, {
      algorithm: "RS256",
      issuer: this.configService.get("GITHUB_APP_ID"),
      expiresIn: this.configService.get("GITHUB_JWT_EXPIRESIN"),
      privateKey: gitHubAppPrivateKey
    })
  }

  private getInstallationId() {
    const token = this.generateJWT();

    return lastValueFrom(this.httpService
      .get<OrganizationInstallationDto>(`/orgs/${GITHUBAPP_ORGANIZATION_NAME}/installation`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }));
  }

  async getRepositoriesList(params: GetRepositoriesListReqDto): Promise<GetRepositoriesListResDto> {
    const { page, per_page, sort, type } = params;

    try {
      const result = await this.octokit.rest.repos.listForOrg({
        org: REACT_NATIVE_COMMUNITY_NAME,
        page,
        per_page,
        sort,
        type
      });

      const { data } = result;

      return {
        list: data.map((repo) => ({
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description
        })),
        page: page,
        perPage: per_page
      };
    } catch (error) {
      throw new NotFoundException("Failed to load repositories.");
    }
  }

  async findRepositoriesByName(params: FindRepositoriesByNameReqDto): Promise<FindRepositoriesByNameResDto> {
    const { name, page, per_page } = params;

    try {
      const result = await this.octokit.rest.search.repos({
        q: `${name ?? ""} in:name org:${REACT_NATIVE_COMMUNITY_NAME}`,
      });

      const { data } = result;

      return {
        list: data.items.map((repo) => ({
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description
        })),
        page,
        perPage: per_page
      }
    } catch (error) {
      throw new NotFoundException("Failed to search repositories.");
    }
  }

  async getRepository(params: GetRepositoryReqDto) {
    const { owner, repo } = params;

    try {
      const result = await this.octokit.rest.repos.get({
        owner,
        repo
      });

      return result.data;
    } catch (error) {
      throw new NotFoundException("Failed to retrieve repository.");
    }
  }
}
