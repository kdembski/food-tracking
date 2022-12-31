import StorageService from "@/services/storage.service";
import { ListFilters } from "@/types/components/list";
import { isEmpty } from "lodash";
import { Ref } from "vue";

export function useStoredFilters(listName: string) {
  const storageFiltersName = listName + "Filters";

  const saveFiltersToStorage = (listFilters: ListFilters) => {
    StorageService.setObject(storageFiltersName, listFilters);
  };

  const getFiltersFromStorage = (): ListFilters => {
    return StorageService.getObject(storageFiltersName);
  };

  const setFiltersFromStorage = (filters: Ref<ListFilters>) => {
    const storedFilters = getFiltersFromStorage();

    if (isEmpty(storedFilters)) {
      return;
    }
    filters.value = storedFilters;
  };

  return {
    setFiltersFromStorage,
    saveFiltersToStorage,
  };
}
