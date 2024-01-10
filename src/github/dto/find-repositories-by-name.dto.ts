import { ApiProperty } from "@nestjs/swagger";
import { Endpoints } from "@octokit/types/dist-types/generated/Endpoints";
import { PaginatedListDto } from "../../common/dto/paginated.dto";

type SearchReposParams = Omit<Endpoints["GET /search/repositories"]["parameters"], "q">;
export type FindRepositoriesByNameReqDto = { name: string } & SearchReposParams;

export class FindRepositoriesByNameReqSchema {
    @ApiProperty({ required: false })
    name: string;
    @ApiProperty({ required: false })
    page: number;
    @ApiProperty({ required: false })
    per_page: number;
}

export interface FindRepositoriesByNameItem {
    name: string;
    fullName: string;
    description: string;
}

export type FindRepositoriesByNameResDto = PaginatedListDto<FindRepositoriesByNameItem>;