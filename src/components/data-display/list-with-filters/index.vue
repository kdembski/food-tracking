<script lang="ts">
import CInput from "@/components/controls/input/index.vue";
import CSelectTags from "@/components/controls/select-tags/index.vue";
import CButton from "@/components/controls/button/index.vue";
import CList from "@/components/data-display/list/index.vue";
import CPagination from "@/components/utils/pagination/index.vue";
import CCard from "@/components/surfaces/card/index.vue";
import CAutocomplete from "@/components/controls/autocomplete/index.vue";
import CSelect from "@/components/controls/select/index.vue";
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
    CSelect,
    CSkeletonLoader,
  },
};
</script>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed, ref, Ref } from "vue";
import { ListFilters, ListSortFilters } from "@/types/list";
import { SelectOption } from "@/components/controls/select/types/select";
import { useAvailableTags } from "./composables/available-tags";
import { useStoredFilters } from "./composables/stored-filters";
import { useFilters } from "./composables/filters/index";
import { onMounted } from "vue";
import { isEmpty } from "lodash";
import { useWindowSize } from "@/components/utils/composables/window-size";
import { useMobileFilters } from "./composables/mobile-filters";
import { useStickyPagination } from "./composables/sticky-pagination";

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

    sortOptions: SelectOption<ListSortFilters>[];
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
  filterBySearchPhrase,
  setTemporarySearchPhrase,
  filterBySearchPhraseWithDelay,
  searchSuggestions,
  isLoadingSearchSuggestions,
  loadSearchSuggestions,
  selectedSort,
  sort,
  getSelectedSortIcon,
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

const paginationRef: Ref<HTMLElement | undefined> = ref();
const {
  paginationStickyClass,
  paginationInitialOffsetTop,
  paginationCurrentOffsetTop,
} = useStickyPagination(paginationRef);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
