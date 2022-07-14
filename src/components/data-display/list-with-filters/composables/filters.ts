import { useStore } from "vuex";
import { computed } from "vue";
import { ListFilters, ListSortFilters } from "@/types/list";
import { ref, Ref } from "vue";
import { isEqual, clone } from "lodash";

let temporarySearchPhrase = "";

export function useFilters(
  defaultFilters: ListFilters,
  handleListLoadingProccess: () => void,
  suggestionsGetterName: string,
  suggestionsLoadActionName: string,
  suggestionsLoadingGetterName: string
) {
  const store = useStore();

  const filters: Ref<ListFilters> = ref(clone(defaultFilters));
  const currentSort = computed(() => {
    return {
      sortAttribute: filters.value.sortAttribute,
      sortDirection: filters.value.sortDirection,
    };
  });

  const filterBySearchPhrase = () => {
    setTemporarySearchPhrase();
    filters.value.currentPage = 1;
    handleListLoadingProccess();
  };

  const setTemporarySearchPhrase = () => {
    temporarySearchPhrase = filters.value.searchPhrase;
  };

  const filterBySearchPhraseWithDelay = () => {
    setTimeout(() => {
      if (temporarySearchPhrase === filters.value.searchPhrase) {
        return;
      }
      filterBySearchPhrase();
    }, 100);
  };

  const loadSearchSuggestions = () => {
    const filtersForSearchSuggestions = {
      searchPhrase: "",
      tags: filters.value.tags,
    };

    store.dispatch(suggestionsLoadActionName, filtersForSearchSuggestions);
  };

  const searchSuggestions = computed(() => {
    const suggestions = store.getters[suggestionsGetterName];
    if (!suggestions) {
      return [];
    }
    return suggestions.map((item: string) => {
      return {
        value: null,
        label: item,
      };
    });
  });

  const isLoadingSearchSuggestions = computed(
    () => store.getters[suggestionsLoadingGetterName]
  );

  const filterByTags = (tags: string) => {
    filters.value.tags = tags;
    filters.value.currentPage = 1;
    handleListLoadingProccess();
  };

  const addTagAndFilter = (name: string) => {
    if (!name) {
      return;
    }
    let tags = filters.value.tags;

    if (tags?.includes(name)) {
      return;
    }

    if (tags) {
      tags += "," + name;
    } else {
      tags = name;
    }

    filterByTags(tags);
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

  const areFiltersEqualToDefault = () => {
    return isEqual(defaultFilters, filters.value);
  };

  const clearFilters = () => {
    if (areFiltersEqualToDefault()) {
      return false;
    }

    filters.value = clone(defaultFilters);
    handleListLoadingProccess();
    return true;
  };

  return {
    filters,
    currentSort,
    filterBySearchPhrase,
    setTemporarySearchPhrase,
    filterBySearchPhraseWithDelay,
    searchSuggestions,
    isLoadingSearchSuggestions,
    loadSearchSuggestions,
    filterBySort,
    filterByTags,
    addTagAndFilter,
    changeCurrentPage,
    areFiltersEqualToDefault,
    clearFilters,
  };
}
