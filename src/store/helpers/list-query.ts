import {
  ListBaseFilters,
  ListFilters,
} from "@/types/components/data-display/list";

export const getListQuery = (filters: ListFilters) => {
  const {
    currentPage,
    pageSize,
    sortAttribute,
    sortDirection,
    searchPhrase,
    tags,
    ingredientIds,
  } = filters;

  const page = currentPage || 1;
  const size = pageSize || 10;
  const query = "?page=" + page + "&size=" + size;

  return (
    query +
    "&" +
    buildQueryFromObject({
      sortAttribute,
      sortDirection,
      searchPhrase,
      tags,
      ingredientIds,
    })
  );
};

export const getListBaseQuery = (filters?: ListBaseFilters) => {
  if (!filters) {
    return "";
  }

  const { searchPhrase, tags, ingredientIds } = filters;
  return "?" + buildQueryFromObject({ searchPhrase, tags, ingredientIds });
};

export const buildQueryFromObject = (object: any) => {
  if (!object) {
    return "";
  }

  let query = "";

  for (const [key, value] of Object.entries(object)) {
    let tempValue = value;
    if (!tempValue) {
      continue;
    }

    if (Array.isArray(tempValue)) {
      if (tempValue.length === 0) {
        continue;
      }
      tempValue = tempValue.join(",");
    }

    query += `${!query ? "" : "&"}${key}=${tempValue}`;
  }

  return query;
};
