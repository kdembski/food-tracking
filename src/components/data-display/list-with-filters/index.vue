<script lang="ts">
import CInput from "@/components/controls/input/index.vue";
import CSelectTags from "@/components/controls/select-tags/index.vue";
import CButton from "@/components/controls/button/index.vue";
import CList from "@/components/data-display/list/index.vue";
import CPagination from "@/components/utils/pagination/index.vue";
import CCard from "@/components/surfaces/card/index.vue";
import CSlider from "@/components/controls/slider/index.vue";
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
    CSlider,
    CAutocomplete,
    CSkeletonLoader,
  },
};
</script>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { ListFilters } from "@/types/list";
import { useAvailableTags } from "./composables/available-tags";
import { useStoredFilters } from "./composables/stored-filters";
import { useFilters } from "./composables/filters";
import { onMounted } from "vue";
import { isEmpty } from "lodash";
import { useWindowSize } from "@/components/utils/composables/window-size";
import { useMobileFilters } from "./composables/mobile-filters";

const store = useStore();

const props = withDefaults(
  defineProps<{
    listName: string;
    listGetterName: string;
    listLoadActionName: string;
    listIsLoadingGetterName: string;
    tagsGetterName?: string;
    tagsLoadActionName?: string;
    tagsIsLoadingGetterName?: string;
    defaultFilters: ListFilters;
    isLoading?: boolean;
    enableTags?: boolean;
    enableRandomButton?: boolean;
  }>(),
  {
    tagsGetterName: "",
    tagsLoadActionName: "",
    tagsIsLoadingGetterName: "",
    isLoading: false,
    enableTags: true,
    enableRandomButton: true,
  }
);

const list = computed(() => store.getters[props.listGetterName]);

const isLoadingList = computed(
  () => store.getters[props.listIsLoadingGetterName]
);

const _isLoading = computed(() => {
  if (props.enableTags) {
    return (
      isLoadingList.value || isLoadingAvailableTags.value || props.isLoading
    );
  }
  return isLoadingList.value || props.isLoading;
});

const isSearchBySliderVisible = computed(() => {
  return !_isLoading.value && props.enableTags;
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

const getTotalCountText = () => {
  const totalCount = list.value?.pagination?.totalRecords;
  if (!totalCount) {
    return "";
  }

  if (totalCount === 1) {
    return "Znaleziono 1 wynik";
  }

  if (totalCount >= 12 && totalCount <= 14) {
    return "Znaleziono " + totalCount + " wyników";
  }

  const totalCountString = totalCount?.toString();
  const firstDigit = parseInt(totalCountString[totalCountString?.length - 1]);

  if (firstDigit >= 2 && firstDigit <= 4) {
    return "Znaleziono " + totalCount + " wyniki";
  }

  return "Znaleziono " + totalCount + " wyników";
};

const loadListOnMounted = () => {
  const storedFilters = getFiltersFromStorage();

  if (!isEmpty(storedFilters)) {
    filters.value = storedFilters;
  }

  handleListLoadingProccess();
};

onMounted(() => {
  loadListOnMounted();
});

// Composables
const {
  filters,
  currentSort,
  filterBySearchPhrase,
  filterBySort,
  filterByTags,
  addTagAndFilter,
  changeCurrentPage,
  areFiltersEqualToDefault,
  clearFilters,
  inputFilterBy,
  inputFilterByOptions,
} = useFilters(props.defaultFilters, handleListLoadingProccess);
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
  props.tagsIsLoadingGetterName
);
const inputSelectedTag = ref(""); // Needed to store autocomplete selected value

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
