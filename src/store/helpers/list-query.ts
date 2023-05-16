import { ListFilters } from "@/types/components/data-display/list";

export const getListQuery = (filters: ListFilters<Record<string, any>>) => {
  const { currentPage, pageSize, sortAttribute, sortDirection, custom } =
    filters;

  const page = currentPage || 1;
  const size = pageSize || 10;
  const query = "?page=" + page + "&size=" + size;

  return (
    query +
    "&" +
    buildQueryFromObject({
      sortAttribute,
      sortDirection,
      ...custom,
    })
  );
};

export const getCustomFiltersQuery = (
  filters?: ListFilters<Record<string, any>>
) => {
  if (!filters || !filters.custom) {
    return "";
  }

  return "?" + buildQueryFromObject(filters.custom);
};

export const buildQueryFromObject = (object: Record<string, any>) => {
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
