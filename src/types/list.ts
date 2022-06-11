export interface ListSortFilters {
  sortAttribute: string;
  sortDirection: string;
}

export interface ListFilters extends ListSortFilters {
  currentPage: number;
  pageSize: number;
  searchPhrase: string;
  tags?: string;
}

export interface ListPagination {
  currentPage: number;
  totalPages: number;
  firstRecord: number;
  lastRecord: number;
  totalRecords: number;
}
