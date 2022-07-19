import { computed } from "vue";
import { useStore } from "vuex";
import { ListFilters } from "@/types/list";
import { Tag } from "@/components/utils/tags/types/tags";

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

    const availableTagsWithoutSelected = availableTags.value?.filter(
      (availableTag: Tag) =>
        !selectedTagsArray?.some(
          (selectedTag) => selectedTag == availableTag.name
        )
    );

    return availableTagsWithoutSelected?.map((tag: Tag) => {
      return {
        value: tag.name,
        label: tag.name,
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
