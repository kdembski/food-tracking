import StorageService from "@/services/storage.service";
import { useStore } from "vuex";
import { computed } from "vue";
import { ListFilters } from "@/types/list";
import { ref, Ref } from "vue";
import { isEmpty } from "lodash";

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
      handleListLoadingProccess();
    }, 200);
  };

  const filterByTags = (tags: string) => {
    filters.value.tags = tags;
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

  return {
    list,
    isLoadingList,
    availableTags,
    isLoadingAvailableTags,
    filters,
    filterBySearchPhrase,
    filterByTags,
    loadListOnMounted,
  };
}
