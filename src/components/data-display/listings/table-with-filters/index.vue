<script lang="ts">
import CSortingTrigger from "./sorting-trigger/index.vue";
import CTable from "@/components/data-display/listings/table/index.vue";
import CPagination from "@/components/utils/pagination/index.vue";
import CInput from "@/components/controls/input/index.vue";

export default {
  name: "CTableWithFilters",
  components: { CTable, CSortingTrigger, CPagination, CInput },
};
</script>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useWindowSize } from "@/composables/window-size";
import { useStore } from "vuex";
import { ListFilters } from "@/types/components/data-display/list";
import { useFilters } from "../composables/filters";
import { useStoredFilters } from "../composables/stored-filters";
import { TableColumn } from "@/types/components/data-display/table";

const store = useStore();
const { windowHeight, isMobile } = useWindowSize();

const props = withDefaults(
  defineProps<{
    listName: string;
    storeModuleName: string;
    isLoading?: boolean;
    defaultFilters: ListFilters;
    columns: TableColumn[];
  }>(),
  { isLoading: false }
);

const list = computed(() => store.getters[props.storeModuleName + "/list"]);
const isLoadingList = computed(
  () => store.getters[props.storeModuleName + "/isLoadingList"]
);

const _isLoading = computed(() => isLoadingList.value || props.isLoading);

const loadList = (filters: ListFilters) => {
  store.dispatch(props.storeModuleName + "/loadList", filters);
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
} = useFilters(
  props.defaultFilters,
  handleListLoadingProccess,
  props.storeModuleName
);

const { setFiltersFromStorage, saveFiltersToStorage } = useStoredFilters(
  props.listName
);

defineExpose({
  handleListLoadingProccess,
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
