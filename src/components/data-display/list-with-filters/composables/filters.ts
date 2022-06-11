import { computed } from "vue";
import { ListFilters, ListSortFilters } from "@/types/list";
import { ref, Ref } from "vue";

let filterBySearchPhraseTimeout = 0;

export function useFilters(
  defaultFilters: ListFilters,
  handleListLoadingProccess: () => void
) {
  const filters: Ref<ListFilters> = ref(defaultFilters);
  const currentSort = computed(() => {
    return {
      sortAttribute: filters.value.sortAttribute,
      sortDirection: filters.value.sortDirection,
    };
  });

  const filterBySearchPhrase = (phrase: string) => {
    clearTimeout(filterBySearchPhraseTimeout);

    filterBySearchPhraseTimeout = setTimeout(() => {
      filters.value.searchPhrase = phrase;
      filters.value.currentPage = 1;
      handleListLoadingProccess();
    }, 200);
  };

  const filterByTags = (tags: string) => {
    filters.value.tags = tags;
    filters.value.currentPage = 1;
    handleListLoadingProccess();
  };

  const addTagAndFilter = (name: string) => {
    if (filters.value.tags) {
      filters.value.tags += "," + name;
    } else {
      filters.value.tags = name;
    }

    filters.value.currentPage = 1;
    handleListLoadingProccess();
  };

  const filterBySort = (sort: ListSortFilters) => {
    filters.value.sortAttribute = sort.sortAttribute;
    filters.value.sortDirection = sort.sortDirection;

    filters.value.currentPage = 1;
    handleListLoadingProccess();
  };

  const changeCurrentPage = (page: number) => {
    filters.value.currentPage = page;
    handleListLoadingProccess();
  };

  return {
    filters,
    currentSort,
    filterBySearchPhrase,
    filterBySort,
    filterByTags,
    addTagAndFilter,
    changeCurrentPage,
  };
}
