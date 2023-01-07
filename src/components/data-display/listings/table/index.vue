<script lang="ts">
import TableLoader from "./loader/index.vue";

export default {
  name: "CTable",
  components: { TableLoader },
};
</script>

<script setup lang="ts">
import { computed, ref, Ref } from "vue";
import { TableColumn } from "@/types/components/data-display/table";

const props = withDefaults(
  defineProps<{
    items?: any[];
    isLoading?: boolean;
    columns: TableColumn[];
  }>(),
  { isLoading: false }
);

const columnsCount = computed(() => props.columns.length);
const itemsCount = computed(() => props.items?.length);
const container: Ref<HTMLElement | undefined> = ref();

const getItemColumnValue = (column: TableColumn, item: any) => {
  if (column.getItemColumnValue) {
    return column.getItemColumnValue(item[column.value]);
  }
  return item[column.value];
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
