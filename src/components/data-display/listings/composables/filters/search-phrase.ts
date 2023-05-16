import { useStore } from "vuex";
import { computed } from "vue";
import { ListFilters } from "@/types/components/data-display/list";
import { Ref } from "vue";

let temporarySearchPhrase = "";

export function useSearchPhraseFilter(
  filters: Ref<ListFilters<any>>,
  handleListLoadingProccess: () => void,
  storeModuleName: string
) {
  const store = useStore();

  const filterBySearchPhrase = () => {
    setTemporarySearchPhrase();
    filters.value.currentPage = 1;
    handleListLoadingProccess();
  };

  const setTemporarySearchPhrase = () => {
    temporarySearchPhrase = filters.value.custom.searchPhrase;
  };

  const filterBySearchPhraseWithDelay = () => {
    setTimeout(() => {
      if (temporarySearchPhrase === filters.value.custom.searchPhrase) {
        return;
      }

      filterBySearchPhrase();
    }, 100);
  };

  const loadSearchSuggestions = () => {
    store.dispatch(storeModuleName + "/loadSearchSuggestions", filters);
  };

  const searchSuggestions = computed(() => {
    return store.getters[storeModuleName + "/searchSuggestions"];
  });

  const isLoadingSearchSuggestions = computed(() => {
    return store.getters[storeModuleName + "/isLoadingSearchSuggestions"];
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
