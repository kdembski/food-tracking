<script lang="ts">
export default { name: "CSortingTrigger" };
</script>

<script setup lang="ts">
import { ListSortFilters } from "@/types/components/data-display/list";
import { TableColumn } from "@/types/components/data-display/table";

const props = defineProps<{
  column: TableColumn;
  currentSort: ListSortFilters;
}>();

const emit = defineEmits<{
  (e: "sortChange", sort: ListSortFilters): void;
}>();

const getActiveIconClass = (direction: string) => {
  if (isThisSortActive(direction)) {
    return "sorting-trigger__icon--active";
  }
  return "";
};

const isThisSortActive = (direction: string) => {
  return (
    isCurrentSortAttributeMatchingColValue(props.currentSort.sortAttribute) &&
    props.currentSort.sortDirection === direction
  );
};

const isCurrentSortAttributeMatchingColValue = (attribute: string) => {
  return attribute === props.column.value;
};

const getOppositeSortDirection = (direction: string) => {
  if (direction === "asc") {
    return "desc";
  }
  return "asc";
};

const changeSort = () => {
  if (isCurrentSortAttributeMatchingColValue(props.currentSort.sortAttribute)) {
    return emit("sortChange", {
      sortAttribute: props.currentSort.sortAttribute,
      sortDirection: getOppositeSortDirection(props.currentSort.sortDirection),
    });
  }

  return emit("sortChange", {
    sortAttribute: props.column.value,
    sortDirection: "asc",
  });
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
