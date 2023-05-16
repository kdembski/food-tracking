import { computed } from "vue";
import { useStore } from "vuex";
import { ListFilters } from "@/types/components/data-display/list";

export function useAvailableTags(storeModuleName: string) {
  const store = useStore();

  const loadAvailableTags = (filters: ListFilters<unknown>) => {
    store.dispatch(storeModuleName + "/loadTags", filters);
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
