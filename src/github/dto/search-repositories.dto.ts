import { ApiProperty } from "@nestjs/swagger";
import { Endpoints } from "@octokit/types/dist-types/generated/Endpoints";
import { PaginatedListDto } from "../../common/dto/paginated.dto";

type SearchReposParams = Omit<Endpoints["GET /search/repositories"]["parameters"], "q">;
export type SearcgRepositoriesReqDto = { name: string } & SearchReposParams;

export class SearchRepositoriesReqSchema {
    @ApiProperty({ required: false })
    name: string;
    @ApiProperty({ required: false })
    page: number;
    @ApiProperty({ required: false })
    per_page: number;
}

export interface SearchRepositoriesItem {
    name: string;
    fullName: string;
    owner: string;
    description: string;
}

export type SearchRepositoriesResDto = PaginatedListDto<SearchRepositoriesItem>;