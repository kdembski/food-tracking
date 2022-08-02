import { useStore } from "vuex";
import { computed } from "vue";
import { ListFilters } from "@/types/list";
import { Ref } from "vue";

let temporarySearchPhrase = "";

export function useSearchPhrase(
  filters: Ref<ListFilters>,
  handleListLoadingProccess: () => void,
  suggestionsGetterName: string,
  suggestionsLoadActionName: string,
  suggestionsLoadingGetterName: string
) {
  const store = useStore();

  const filterBySearchPhrase = () => {
    setTemporarySearchPhrase();
    filters.value.currentPage = 1;
    handleListLoadingProccess();
  };

  const setTemporarySearchPhrase = () => {
    temporarySearchPhrase = filters.value.searchPhrase;
  };

  const filterBySearchPhraseWithDelay = () => {
    setTimeout(() => {
      if (temporarySearchPhrase === filters.value.searchPhrase) {
        return;
      }
      filterBySearchPhrase();
    }, 100);
  };

  const loadSearchSuggestions = () => {
    const filtersForSearchSuggestions = {
      searchPhrase: "",
      tags: filters.value.tags,
    };

    store.dispatch(suggestionsLoadActionName, filtersForSearchSuggestions);
  };

  const searchSuggestions = computed(() => {
    const suggestions = store.getters[suggestionsGetterName];
    if (!suggestions) {
      return [];
    }
    return suggestions.map((item: string) => {
      return {
        value: null,
        label: item,
      };
    });
  });

  const isLoadingSearchSuggestions = computed(
    () => store.getters[suggestionsLoadingGetterName]
  );

  return {
    filterBySearchPhrase,
    setTemporarySearchPhrase,
    filterBySearchPhraseWithDelay,
    searchSuggestions,
    isLoadingSearchSuggestions,
    loadSearchSuggestions,
  };
}
