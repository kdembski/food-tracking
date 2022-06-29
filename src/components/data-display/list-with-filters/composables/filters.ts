import { useWindowSize } from "@/components/utils/composables/window-size";
import { computed } from "vue";
import { ListFilters, ListSortFilters } from "@/types/list";
import { ref, Ref } from "vue";
import { isEqual, clone } from "lodash";

let filterBySearchPhraseTimeout = 0;

export function useFilters(
  defaultFilters: ListFilters,
  handleListLoadingProccess: () => void
) {
  const { windowHeight, isMobile } = useWindowSize();

  const filters: Ref<ListFilters> = ref(clone(defaultFilters));
  const currentSort = computed(() => {
    return {
      sortAttribute: filters.value.sortAttribute,
      sortDirection: filters.value.sortDirection,
    };
  });
  const inputFilterBy = ref("byName");
  const inputFilterByOptions = [
    { value: "byName", label: "Nazwa" },
    { value: "byTags", label: "Tagi" },
  ];

  const filterBySearchPhrase = (phrase: string) => {
    clearTimeout(filterBySearchPhraseTimeout);

    filterBySearchPhraseTimeout = setTimeout(() => {
      filters.value.searchPhrase = phrase;
      filters.value.currentPage = 1;
      handleListLoadingProccess();
    }, 800);
  };

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

    filters.value.tags = tags;
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
    filterBySort,
    filterByTags,
    addTagAndFilter,
    changeCurrentPage,
    areFiltersEqualToDefault,
    clearFilters,
    inputFilterBy,
    inputFilterByOptions,
  };
}
