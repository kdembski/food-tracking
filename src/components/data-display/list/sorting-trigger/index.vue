<script lang="ts">
export default { name: "CSortingTrigger" };
</script>

<script setup lang="ts">
import { inject, ComputedRef } from "vue";
import { ListSortFilters } from "@/types/list";

const props = defineProps({
  column: {
    type: Object,
    default() {
      return {
        value: "",
        label: "",
      };
    },
  },
});

const emit = defineEmits<{
  (e: "sortChange", sort: ListSortFilters): void;
}>();

const currentSort =
  inject<ComputedRef<{ sortAttribute: string; sortDirection: string }>>(
    "currentSort"
  );

const getActiveIconClass = (direction: string) => {
  if (isThisSortActive(direction)) {
    return "sorting-trigger__icon--active";
  }
  return "";
};

const isThisSortActive = (direction: string) => {
  if (!currentSort) {
    return;
  }

  return (
    isCurrentSortAttributeMatchingColValue(currentSort.value.sortAttribute) &&
    currentSort.value.sortDirection === direction
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
  if (!currentSort) {
    return;
  }

  if (isCurrentSortAttributeMatchingColValue(currentSort.value.sortAttribute)) {
    return emit("sortChange", {
      sortAttribute: currentSort.value.sortAttribute,
      sortDirection: getOppositeSortDirection(currentSort.value.sortDirection),
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
