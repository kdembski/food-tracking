import StorageService from "@/services/storage.service";
import { useStore } from "vuex";
import { computed } from "vue";
import { ListFilters } from "@/types/list";
import { ref, Ref } from "vue";
import { isEmpty, isEqual, clone } from "lodash";

const availableTags = ref("");
const isLoadingAvailableTags = ref(false);

let filterBySearchPhraseTimeout = 0;

export function useListWithFilters(
  listName: string,
  listGetter: string,
  listLoadAction: string,
  listIsLoadingGetter: string,
  listGetTagsAction: string,
  defaultFilters: ListFilters
) {
  const store = useStore();

  const filters: Ref<ListFilters> = ref(defaultFilters);
  const list = computed(() => store.getters[listGetter]);
  const isLoadingList = computed(() => store.getters[listIsLoadingGetter]);

  const loadList = (filters: ListFilters) => {
    store.dispatch(listLoadAction, filters);
  };

  const saveFiltersToStorage = (listFilters: ListFilters) => {
    StorageService.setObject(listName, listFilters);
  };

  const getFiltersFromStorage = (): ListFilters => {
    return StorageService.getObject(listName);
  };

  const loadListAndSaveFiltersToStorage = (listFilters: ListFilters) => {
    saveFiltersToStorage(listFilters);
    loadList(listFilters);
  };

  const setAvailableTags = () => {
    isLoadingAvailableTags.value = true;

    const filtersForAvailableTags = {
      searchPhrase: filters.value.searchPhrase,
      tags: filters.value.tags,
    };

    store
      .dispatch(listGetTagsAction, filtersForAvailableTags)
      .then((response) => {
        availableTags.value = response;
        isLoadingAvailableTags.value = false;
      });
  };

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

  const changeCurrentPage = (page: number) => {
    filters.value.currentPage = page;
    handleListLoadingProccess();
  };

  const handleListLoadingProccess = () => {
    setAvailableTags();
    loadListAndSaveFiltersToStorage(filters.value);
  };

  const loadListOnMounted = () => {
    const storedFilters = getFiltersFromStorage();

    if (!isEmpty(storedFilters)) {
      filters.value = storedFilters;
    }

    handleListLoadingProccess();
  };

  const clearListFilters = () => {
    if (isEqual(defaultFilters, filters.value)) {
      return false;
    }

    filters.value = clone(defaultFilters);
    handleListLoadingProccess();
    return true;
  };

  return {
    list,
    isLoadingList,
    availableTags,
    isLoadingAvailableTags,
    filters,
    filterBySearchPhrase,
    filterByTags,
    addTagAndFilter,
    loadListOnMounted,
    clearListFilters,
    changeCurrentPage,
  };
}