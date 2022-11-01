import { ListFilters, ListBaseFilters } from "@/types/components/list";

export const getListQuery = (filters: ListFilters) => {
  const page = filters.currentPage || 1;
  const size = filters.pageSize || 10;
  let query = "?page=" + page + "&size=" + size;

  if (filters.searchPhrase) {
    query += "&search=" + filters.searchPhrase;
  }
  if (filters.sortAttribute) {
    query += "&attr=" + filters.sortAttribute;
  }
  if (filters.sortDirection) {
    query += "&dir=" + filters.sortDirection;
  }
  if (filters.tags) {
    query += "&tags=" + filters.tags;
  }

  return query;
};

export const getListBaseQuery = (filters: ListBaseFilters) => {
  if (!filters) {
    return "";
  }

  if (filters.searchPhrase && filters.tags) {
    return "?search=" + filters.searchPhrase + "&tags=" + filters.tags;
  }

  if (filters.searchPhrase) {
    return "?search=" + filters.searchPhrase;
  }

  if (filters.tags) {
    return "?tags=" + filters.tags;
  }

  return "";
};
