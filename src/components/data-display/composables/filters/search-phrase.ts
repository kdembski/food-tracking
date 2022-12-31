import { useStore } from "vuex";
import { computed } from "vue";
import { ListFilters } from "@/types/components/list";
import { Ref } from "vue";

let temporarySearchPhrase = "";

export function useSearchPhraseFilter(
  filters: Ref<ListFilters>,
  handleListLoadingProccess: () => void,
  suggestionsGetterName?: string,
  suggestionsLoadActionName?: string,
  suggestionsLoadingGetterName?: string
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
    if (!suggestionsLoadActionName) {
      return;
    }

    const filtersForSearchSuggestions = {
      searchPhrase: "",
      tags: filters.value.tags,
    };

    store.dispatch(suggestionsLoadActionName, filtersForSearchSuggestions);
  };

  const searchSuggestions = computed(() => {
    if (!suggestionsGetterName) {
      return;
    }
    return store.getters[suggestionsGetterName];
  });

  const isLoadingSearchSuggestions = computed(() => {
    if (!suggestionsLoadingGetterName) {
      return;
    }
    return store.getters[suggestionsLoadingGetterName];
  });

  return {
    filterBySearchPhrase,
    setTemporarySearchPhrase,
    filterBySearchPhraseWithDelay,
    searchSuggestions,
    isLoadingSearchSuggestions,
    loadSearchSuggestions,
  };
}
