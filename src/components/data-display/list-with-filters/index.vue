<script lang="ts">
import CInput from "@/components/controls/input/index.vue";
import CSelectTags from "@/components/controls/select-tags/index.vue";
import CButton from "@/components/controls/button/index.vue";
import CList from "@/components/data-display/list/index.vue";
import CPagination from "./pagination/index.vue";
import CCard from "@/components/surfaces/card/index.vue";
import CSlider from "@/components/controls/slider/index.vue";
import CAutocomplete from "@/components/controls/autocomplete/index.vue";

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
  }>(),
  {
    tagsGetterName: "",
    tagsLoadActionName: "",
    tagsIsLoadingGetterName: "",
    isLoading: false,
  }
);

const list = computed(() => store.getters[props.listGetterName]);

const isLoadingList = computed(
  () => store.getters[props.listIsLoadingGetterName]
);

const _isLoading = computed(
  () => isLoadingList.value || isLoadingAvailableTags.value || props.isLoading
);

const loadList = (filters: ListFilters) => {
  store.dispatch(props.listLoadActionName, filters);
};

const handleListLoadingProccess = () => {
  saveFiltersToStorage(filters.value);
  loadAvailableTags(filters.value);
  loadList(filters.value);
};

const availableTagsOptions = computed(() => {
  const selectedTags = filters.value.tags?.split(",");

  const availableTagsWithoutSelected = availableTags.value
    ?.split(",")
    .filter(
      (availableTag: string) =>
        !selectedTags?.some((selectedTag) => selectedTag == availableTag)
    );

  return availableTagsWithoutSelected.map((tag: string) => {
    return {
      value: tag,
      label: tag,
    };
  });
});
const inputSelectedTag = ref(""); // Needed to store autocomplete selected value

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

const { loadAvailableTags, availableTags, isLoadingAvailableTags } =
  useAvailableTags(
    props.tagsLoadActionName,
    props.tagsGetterName,
    props.tagsIsLoadingGetterName
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
