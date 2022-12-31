import { computed } from "vue";
import { useStore } from "vuex";
import { ListFilters } from "@/types/components/list";

export function useAvailableTags(
  tagsLoadActionName: string,
  tagsGetterName: string,
  tagsLoadingGetterName: string
) {
  const store = useStore();

  const loadAvailableTags = (filters: ListFilters) => {
    const filtersForAvailableTags = {
      searchPhrase: filters.searchPhrase,
      tags: filters.tags,
    };

    store.dispatch(tagsLoadActionName, filtersForAvailableTags);
  };

  const availableTags = computed(() => store.getters[tagsGetterName]);
  const isLoadingAvailableTags = computed(
    () => store.getters[tagsLoadingGetterName]
  );

  return {
    loadAvailableTags,
    availableTags,
    isLoadingAvailableTags,
  };
}
