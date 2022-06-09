<script lang="ts">
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";

export default {
  name: "CPagination",
  components: { CSkeletonLoader },
};
</script>

<script setup lang="ts">
import { ListPagination } from "@/types/list";

const props = withDefaults(
  defineProps<{
    paginationData: ListPagination;
    currentPage: number;
    isLoading: boolean;
  }>(),
  { currentPage: 1, isLoading: false }
);

const emit = defineEmits<{
  (e: "update:currentPage", page: number): void;
}>();

const getPaginationSummaryText = () => {
  return (
    "Wyświetlono \xa0\xa0" +
    props.paginationData.firstRecord +
    " - " +
    props.paginationData.lastRecord +
    "\xa0\xa0 z \xa0\xa0" +
    props.paginationData.totalRecords +
    " wyników"
  );
};

const isPageActive = (pageNumber: number) => {
  return pageNumber === props.paginationData.currentPage;
};

const getPaginationActiveItemClass = (pageNumber: number) => {
  if (isPageActive(pageNumber)) {
    return "list-pagination-pages__item--active";
  }
  return "";
};

const changePage = (pageNumber: number) => {
  emit("update:currentPage", pageNumber);
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
