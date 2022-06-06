import StorageService from "@/services/storage.service";
import { useStore } from "vuex";
import { computed } from "vue";
import { ListFilters } from "@/types/list";

export function useList(
  listName: string,
  listGetter: string,
  listLoadAction: string,
  listIsLoading: string
) {
  const store = useStore();
  const list = computed(() => store.getters[listGetter]);
  const isLoadingList = computed(() => store.state[listIsLoading]);

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

  return {
    list,
    isLoadingList,
    loadListAndSaveFiltersToStorage,
    getFiltersFromStorage,
  };
}
