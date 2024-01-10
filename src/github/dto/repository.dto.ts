import { ApiProperty } from "@nestjs/swagger";
import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types"

export type GetRepositoryReqDto = RestEndpointMethodTypes["repos"]["get"]["parameters"]

export class GetRepositoryReqSchema {
    @ApiProperty()
    owner: string;
    @ApiProperty()
    repo: string;
}