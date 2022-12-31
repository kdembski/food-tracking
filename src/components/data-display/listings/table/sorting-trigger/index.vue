<script lang="ts">
export default { name: "CSortingTrigger" };
</script>

<script setup lang="ts">
import { ListSortFilters } from "@/types/components/list";

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
  currentSort: {
    type: Object,
    default() {
      return { sortAttribute: "", sortDirection: "" };
    },
  },
});

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
