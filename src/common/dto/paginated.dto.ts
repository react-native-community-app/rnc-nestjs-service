export class PaginatedListDto<T> {
    list: T[];
    page:number;
    perPage:number;            
}