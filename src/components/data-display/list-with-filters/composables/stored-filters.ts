import StorageService from "@/services/storage.service";
import { ListFilters } from "@/types/components/list";

export function useStoredFilters(listName: string) {
  const storageFiltersName = listName + "Filters";

  const saveFiltersToStorage = (listFilters: ListFilters) => {
    StorageService.setObject(storageFiltersName, listFilters);
  };

  const getFiltersFromStorage = (): ListFilters => {
    return StorageService.getObject(storageFiltersName);
  };

  return {
    getFiltersFromStorage,
    saveFiltersToStorage,
  };
}
