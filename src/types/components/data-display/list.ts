export interface ListSortFilters {
  sortAttribute: string;
  sortDirection: string;
}

export interface ListPaginationFilters {
  currentPage: number;
  pageSize: number;
}

export interface ListFilters<CustomFilters>
  extends ListSortFilters,
    ListPaginationFilters {
  custom: CustomFilters;
}

export interface ListPagination {
  currentPage: number;
  totalPages: number;
  firstRecord: number;
  lastRecord: number;
  totalRecords: number;
}

export type List<T> = {
  data: Array<T>;
  pagination: ListPagination;
};
