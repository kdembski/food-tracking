import { ListFilters } from "@/types/components/data-display/list";
import { ref, Ref } from "vue";
import { isEqual, cloneDeep } from "lodash";
import { useSearchPhraseFilter } from "./search-phrase";
import { useSortFilter } from "./sort";
import { useTagsFilter } from "./tags";

export function useFilters(
  defaultFilters: ListFilters<unknown>,
  handleListLoadingProccess: () => void,
  storeModuleName: string
) {
  const filters: Ref<ListFilters<unknown>> = ref(cloneDeep(defaultFilters));

  const changeCurrentPage = (page: number) => {
    filters.value.currentPage = page;
    handleListLoadingProccess();
  };

  const areFiltersEqualToDefault = () => {
    return isEqual(defaultFilters, filters.value);
  };

  const clearFilters = () => {
    if (areFiltersEqualToDefault()) {
      return;
    }

    filters.value = cloneDeep(defaultFilters);
    handleListLoadingProccess();
  };

  const { filterByTags } = useTagsFilter(filters, handleListLoadingProccess);

  const { selectedSort, sort, getSelectedSortIcon } = useSortFilter(
    filters,
    handleListLoadingProccess
  );

  const {
    filterBySearchPhrase,
    setTemporarySearchPhrase,
    filterBySearchPhraseWithDelay,
    searchSuggestions,
    isLoadingSearchSuggestions,
    loadSearchSuggestions,
  } = useSearchPhraseFilter(
    filters,
    handleListLoadingProccess,
    storeModuleName
  );

  return {
    filters,
    filterBySearchPhrase,
    setTemporarySearchPhrase,
    filterBySearchPhraseWithDelay,
    searchSuggestions,
    isLoadingSearchSuggestions,
    loadSearchSuggestions,
    selectedSort,
    sort,
    getSelectedSortIcon,
    filterByTags,
    changeCurrentPage,
    areFiltersEqualToDefault,
    clearFilters,
  };
}
