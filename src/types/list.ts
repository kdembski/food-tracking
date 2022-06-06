export interface ListFilters {
  currentPage: number;
  pageSize: number;
  searchPhrase: string;
  sortAttribute: string;
  sortDirection: string;
  tags?: string;
}

export interface ListPagination {
  currentPage: number;
  totalPages: number;
  firstRecord: number;
  lastRecord: number;
  totalRecords: number;
}
