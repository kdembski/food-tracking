import { computed } from "vue";
import { useStore } from "vuex";
import { ListFilters } from "@/types/list";

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

  const getAvailableTagsOptions = (selectedTags: string) => {
    const selectedTagsArray = selectedTags.split(",");

    const availableTagsWithoutSelected = availableTags.value
      ?.split(",")
      .filter(
        (availableTag: string) =>
          !selectedTagsArray?.some((selectedTag) => selectedTag == availableTag)
      );

    return availableTagsWithoutSelected?.map((tag: string) => {
      return {
        value: tag,
        label: tag,
      };
    });
  };

  return {
    loadAvailableTags,
    availableTags,
    isLoadingAvailableTags,
    getAvailableTagsOptions,
  };
}
