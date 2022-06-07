import { ListFilters } from "@/types/list";
import { useStore } from "vuex";
import { ref, Ref } from "vue";

const availableTags = ref("");
const isLoadingAvailableTags = ref(false);
const filters: Ref<ListFilters> = ref({
  currentPage: 1,
  pageSize: 10,
  searchPhrase: "",
  sortAttribute: "",
  sortDirection: "",
  tags: "",
});

export function useRecipesFiltering(
  loadListAndSaveFiltersToStorage: (listFilters: ListFilters) => void
) {
  const store = useStore();

  const setAvailableRecipesTags = () => {
    isLoadingAvailableTags.value = true;

    const filtersForAvailableTags = {
      searchPhrase: filters.value.searchPhrase,
      tags: filters.value.tags,
    };

    store
      .dispatch("recipe/getAvailableRecipesTags", filters)
      .then((response) => {
        availableTags.value = response;
        isLoadingAvailableTags.value = false;
      });
  };

  const filterBySearchPhrase = (phrase: string) => {
    filters.value.searchPhrase = phrase;
    handleRecipesListLoading();
  };

  const filterByTags = (tags: string) => {
    filters.value.tags = tags;
    handleRecipesListLoading();
  };

  const handleRecipesListLoading = () => {
    setAvailableRecipesTags();
    loadListAndSaveFiltersToStorage(filters.value);
  };

  return {
    availableTags,
    isLoadingAvailableTags,
    filters,
    filterBySearchPhrase,
    filterByTags,
    handleRecipesListLoading,
  };
}
