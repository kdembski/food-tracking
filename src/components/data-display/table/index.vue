<script lang="ts">
import CSortingTrigger from "./sorting-trigger/index.vue";
import CTableLoader from "./loader/index.vue";
import CPagination from "@/components/utils/pagination/index.vue";
import CAutocomplete from "@/components/controls/autocomplete/index.vue";

export default {
  name: "CTable",
  components: { CTableLoader, CSortingTrigger, CPagination, CAutocomplete },
};
</script>

<script setup lang="ts">
import { computed, onMounted, ref, Ref } from "vue";
import { useWindowSize } from "@/composables/window-size";
import { useStore } from "vuex";
import { ListFilters } from "@/types/components/list";
import { useFilters } from "../composables/filters";
import { useStoredFilters } from "../composables/stored-filters";

const store = useStore();
const { windowHeight, isMobile } = useWindowSize();

const props = withDefaults(
  defineProps<{
    listName: string;
    listGetterName: string;
    listLoadActionName: string;
    listLoadingGetterName: string;
    isLoading?: boolean;

    defaultFilters: ListFilters;
    columns: { label: string; value: string; isSortable: boolean }[];
  }>(),
  { isLoading: false }
);

const columnsCount = computed(() => props.columns.length);
const itemsCount = computed(() => list.value?.data?.length);
const container: Ref<HTMLElement | undefined> = ref();

const list = computed(() => store.getters[props.listGetterName]);
const isLoadingList = computed(
  () => store.getters[props.listLoadingGetterName]
);
const _isLoading = computed(() => isLoadingList.value || props.isLoading);

const loadList = (filters: ListFilters) => {
  store.dispatch(props.listLoadActionName, filters);
};

const handleListLoadingProccess = () => {
  saveFiltersToStorage(filters.value);
  loadList(filters.value);
};

const loadListOnMounted = () => {
  setFiltersFromStorage(filters);
  handleListLoadingProccess();
};

onMounted(async () => {
  loadListOnMounted();
});

const {
  filters,
  filterBySearchPhrase,
  setTemporarySearchPhrase,
  filterBySearchPhraseWithDelay,
  selectedSort,
  sort,
  changeCurrentPage,
  areFiltersEqualToDefault,
  clearFilters,
} = useFilters(props.defaultFilters, handleListLoadingProccess);

const { setFiltersFromStorage, saveFiltersToStorage } = useStoredFilters(
  props.listName
);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
