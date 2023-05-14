<script lang="ts">
import CInput from "@/components/controls/inputs/input/index.vue";
import CSelectTags from "@/components/controls/custom/select-tags/pills/index.vue";
import CButton from "@/components/controls/buttons/button/index.vue";
import CList from "@/components/data-display/listings/list/index.vue";
import CPagination from "@/components/utils/pagination/index.vue";
import CAutocomplete from "@/components/controls/inputs/autocomplete/index.vue";
import CSelect from "@/components/controls/select/index.vue";
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";
import CDraggableButton from "@/components/controls/buttons/draggable-button/index.vue";

export default {
  name: "CListWithFilters",
  components: {
    CInput,
    CSelectTags,
    CList,
    CButton,
    CPagination,
    CAutocomplete,
    CSelect,
    CSkeletonLoader,
    CDraggableButton,
  },
};
</script>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed, ref, Ref } from "vue";
import {
  ListFilters,
  ListSortFilters,
} from "@/types/components/data-display/list";
import { DropdownOption } from "@/types/components/utils/dropdown";
import { useAvailableTags } from "./composables/available-tags";
import { useStoredFilters } from "../composables/stored-filters";
import { useFilters } from "../composables/filters/index";
import { onMounted } from "vue";
import { useWindowSize } from "@/composables/window-size";
import { useMobileFilters } from "./composables/mobile-filters";
import { useStickyPagination } from "./composables/sticky-pagination";

const store = useStore();

const props = withDefaults(
  defineProps<{
    storeModuleName: string;
    listName: string;
    defaultFilters: ListFilters;
    isLoading?: boolean;
    enableTags?: boolean;
    enableRandomButton?: boolean;
    sortOptions: DropdownOption<ListSortFilters>[];
    loadAdditionalFilters?: (filters: ListFilters) => void;
  }>(),
  {
    isLoading: false,
    enableTags: true,
    enableRandomButton: true,
  }
);

const selectedTagsRef = ref();
const list = computed(() => store.getters[props.storeModuleName + "/list"]);
const isLoadingList = computed(
  () => store.getters[props.storeModuleName + "/isLoadingList"]
);

const _isLoading = computed(() => {
  return isLoadingList.value || props.isLoading || isLoadingAvailableTags.value;
});

const loadList = (filters: ListFilters) => {
  store.dispatch(props.storeModuleName + "/loadList", filters);
};

const handleListLoadingProccess = () => {
  saveFiltersToStorage(filters.value);
  if (props.enableTags) {
    loadAvailableTags(filters.value);
  }
  props.loadAdditionalFilters?.(filters.value);
  loadList(filters.value);
};

const loadListOnMounted = () => {
  setFiltersFromStorage(filters);
  handleListLoadingProccess();
};

onMounted(async () => {
  loadListOnMounted();
});

// __composables__
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
  changeCurrentPage,
  areFiltersEqualToDefault,
  clearFilters,
} = useFilters(
  props.defaultFilters,
  handleListLoadingProccess,
  props.storeModuleName
);

const { setFiltersFromStorage, saveFiltersToStorage } = useStoredFilters(
  props.listName
);

const { loadAvailableTags, availableTags, isLoadingAvailableTags } =
  useAvailableTags(props.storeModuleName);

const { isMobile, windowHeight } = useWindowSize();

const { areMobileFiltersOpen, toggleFiltersOnMobile } =
  useMobileFilters(isMobile);

const paginationRef: Ref<HTMLElement | undefined> = ref();
const { paginationStickyClass } = useStickyPagination(paginationRef);

defineExpose({
  handleListLoadingProccess,
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
