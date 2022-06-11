<script lang="ts">
import CInput from "@/components/controls/input/index.vue";
import CSelectTags from "@/components/controls/select-tags/index.vue";
import CButton from "@/components/controls/button/index.vue";
import CList from "@/components/data-display/list/index.vue";
import CPagination from "./pagination/index.vue";

export default {
  name: "CListWithFilters",
  components: { CInput, CSelectTags, CList, CButton, CPagination },
};
</script>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";
import { ListFilters } from "@/types/list";
import { useAvailableTags } from "./composables/available-tags";
import { useStoredFilters } from "./composables/stored-filters";
import { useFilters } from "./composables/filters";
import { onMounted, provide } from "vue";
import { isEmpty, isEqual, clone } from "lodash";
const store = useStore();

const props = withDefaults(
  defineProps<{
    columns: Array<any>;
    getItemColumnValue?: (value: string | number) => string | number;
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
    getItemColumnValue: (value: string | number) => value,
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

const {
  filters,
  currentSort,
  filterBySearchPhrase,
  filterBySort,
  filterByTags,
  addTagAndFilter,
  changeCurrentPage,
} = useFilters(props.defaultFilters, handleListLoadingProccess);

provide("currentSort", currentSort);

const { loadAvailableTags, availableTags, isLoadingAvailableTags } =
  useAvailableTags(
    props.tagsLoadActionName,
    props.tagsGetterName,
    props.tagsIsLoadingGetterName
  );

const { getFiltersFromStorage, saveFiltersToStorage } = useStoredFilters(
  props.listName
);

const loadListOnMounted = () => {
  const storedFilters = getFiltersFromStorage();

  if (!isEmpty(storedFilters)) {
    filters.value = storedFilters;
  }

  handleListLoadingProccess();
};

const areFiltersEqualToDefault = () => {
  return isEqual(props.defaultFilters, filters.value);
};

const clearFilters = () => {
  if (areFiltersEqualToDefault()) {
    return false;
  }

  filters.value = clone(props.defaultFilters);
  handleListLoadingProccess();
  return true;
};

onMounted(() => {
  loadListOnMounted();
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
