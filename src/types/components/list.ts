export interface ListSortFilters {
  sortAttribute: string;
  sortDirection: string;
}

export interface ListPaginationFilters {
  currentPage: number;
  pageSize: number;
}

export interface ListBaseFilters {
  searchPhrase: string;
  tags?: string;
}

export interface ListFilters
  extends ListBaseFilters,
    ListSortFilters,
    ListPaginationFilters {}

export interface ListPagination {
  currentPage: number;
  totalPages: number;
  firstRecord: number;
  lastRecord: number;
  totalRecords: number;
}

export type ListWithFilters<T> = {
  data: Array<T>;
  pagination: ListPagination;
};
