import { computed } from "vue";
import { useStore } from "vuex";
import { ListFilters } from "@/types/components/data-display/list";

export function useAvailableTags(storeModuleName: string) {
  const store = useStore();

  const loadAvailableTags = (filters: ListFilters) => {
    const filtersForAvailableTags = {
      searchPhrase: filters.searchPhrase,
      tags: filters.tags,
    };

    store.dispatch(storeModuleName + "/loadTags", filtersForAvailableTags);
  };

  const availableTags = computed(
    () => store.getters[storeModuleName + "/tags"]
  );
  const isLoadingAvailableTags = computed(
    () => store.getters[storeModuleName + "/isLoadingTags"]
  );

  return {
    loadAvailableTags,
    availableTags,
    isLoadingAvailableTags,
  };
}
