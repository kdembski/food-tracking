<script lang="ts">
import CInput from "@/components/controls/input/index.vue";
import CSelectTags from "@/components/controls/select-tags/index.vue";
import CButton from "@/components/controls/button/index.vue";
import CList from "@/components/data-display/list/index.vue";
import CPagination from "@/components/utils/pagination/index.vue";
import CCard from "@/components/surfaces/card/index.vue";
import CAutocomplete from "@/components/controls/autocomplete/index.vue";
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";

export default {
  name: "CListWithFilters",
  components: {
    CInput,
    CSelectTags,
    CList,
    CButton,
    CPagination,
    CCard,
    CAutocomplete,
    CSkeletonLoader,
  },
};
</script>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed, Ref, ref, watch, nextTick } from "vue";
import { ListFilters } from "@/types/list";
import { useAvailableTags } from "./composables/available-tags";
import { useStoredFilters } from "./composables/stored-filters";
import { useFilters } from "./composables/filters";
import { onMounted } from "vue";
import { isEmpty } from "lodash";
import { useWindowSize } from "@/components/utils/composables/window-size";
import { useMobileFilters } from "./composables/mobile-filters";
import getWordPlurarForms from "@/utils/getWordPlurarForms";

const store = useStore();

const props = withDefaults(
  defineProps<{
    listGetterName: string;
    listLoadActionName: string;
    listLoadingGetterName: string;

    tagsGetterName?: string;
    tagsLoadActionName?: string;
    tagsLoadingGetterName?: string;

    suggestionsGetterName?: string;
    suggestionsLoadActionName?: string;
    suggestionsLoadingGetterName?: string;

    listName: string;
    defaultFilters: ListFilters;
    isLoading?: boolean;
    enableTags?: boolean;
    enableRandomButton?: boolean;
  }>(),
  {
    tagsGetterName: "",
    tagsLoadActionName: "",
    tagsLoadingGetterName: "",
    suggestionsGetterName: "",
    suggestionsLoadActionName: "",
    suggestionsLoadingGetterName: "",
    isLoading: false,
    enableTags: true,
    enableRandomButton: true,
  }
);

const list = computed(() => store.getters[props.listGetterName]);

const isLoadingList = computed(
  () => store.getters[props.listLoadingGetterName]
);

const _isLoading = computed(() => {
  if (props.enableTags) {
    return (
      isLoadingList.value || isLoadingAvailableTags.value || props.isLoading
    );
  }
  return isLoadingList.value || props.isLoading;
});

const loadList = (filters: ListFilters) => {
  store.dispatch(props.listLoadActionName, filters);
};

const handleListLoadingProccess = () => {
  saveFiltersToStorage(filters.value);
  if (props.enableTags) {
    loadAvailableTags(filters.value);
  }
  loadList(filters.value);
};

const loadListOnMounted = () => {
  const storedFilters = getFiltersFromStorage();

  if (!isEmpty(storedFilters)) {
    filters.value = storedFilters;
  }

  handleListLoadingProccess();
};

onMounted(async () => {
  loadListOnMounted();
});

// Composables
const {
  filters,
  currentSort,
  filterBySearchPhrase,
  setTemporarySearchPhrase,
  filterBySearchPhraseWithDelay,
  searchSuggestions,
  isLoadingSearchSuggestions,
  loadSearchSuggestions,
  filterBySort,
  filterByTags,
  addTagAndFilter,
  changeCurrentPage,
  areFiltersEqualToDefault,
  clearFilters,
} = useFilters(
  props.defaultFilters,
  handleListLoadingProccess,
  props.suggestionsGetterName,
  props.suggestionsLoadActionName,
  props.suggestionsLoadingGetterName
);
const { getFiltersFromStorage, saveFiltersToStorage } = useStoredFilters(
  props.listName
);

const {
  loadAvailableTags,
  availableTags,
  isLoadingAvailableTags,
  getAvailableTagsOptions,
} = useAvailableTags(
  props.tagsLoadActionName,
  props.tagsGetterName,
  props.tagsLoadingGetterName
);

const { isMobile, windowHeight } = useWindowSize();
const {
  areMobileFiltersOpen,
  toggleFiltersOnMobile,
  onMobileBtnTouchMove,
  onMobileBtnTouchStart,
  mobileBtnStyle,
} = useMobileFilters(isMobile, windowHeight);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
