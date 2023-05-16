import StorageService from "@/services/storage.service";
import { ListFilters } from "@/types/components/data-display/list";
import { isEmpty } from "lodash";
import { Ref } from "vue";

export function useStoredFilters(listName: string) {
  const storageFiltersName = listName + "Filters";

  const saveFiltersToStorage = (listFilters: ListFilters<unknown>) => {
    StorageService.setObject(storageFiltersName, listFilters);
  };

  const getFiltersFromStorage = (): ListFilters<unknown> => {
    return StorageService.getObject(storageFiltersName);
  };

  const setFiltersFromStorage = (filters: Ref<ListFilters<unknown>>) => {
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
