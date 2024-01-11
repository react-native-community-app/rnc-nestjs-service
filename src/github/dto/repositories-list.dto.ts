import { ApiProperty } from "@nestjs/swagger";
import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types"
import { PaginatedListDto } from "../../common/dto/paginated.dto";

export type GetRepositoriesListReqDto = RestEndpointMethodTypes["repos"]["listForOrg"]["parameters"];

export class GetRepositoriesListReqSchema {
    @ApiProperty({
        required: false
    })
    page: number;
    @ApiProperty({
        required: false
    })
    per_page: number;
    @ApiProperty({
        required: false
    })
    type?: "all" | "public" | "private" | "forks" | "sources" | "member";
    @ApiProperty({
        required: false
    })
    sort?: "created" | "updated" | "pushed" | "full_name";
}

export interface GetRepositoriesListItem {
    name: string;
    fullName: string;
    owner: string;
    description: string;
}

export type GetRepositoriesListResDto = PaginatedListDto<GetRepositoriesListItem>;