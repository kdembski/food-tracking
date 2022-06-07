export interface TagsFilters {
  searchPhrase: string;
  tags: string;
}

export const getAvailableTagsQuery = (filters: TagsFilters) => {
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
