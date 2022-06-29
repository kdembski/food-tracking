<script lang="ts">
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";

export default {
  name: "CPagination",
  components: { CSkeletonLoader },
};
</script>

<script setup lang="ts">
import { ListPagination } from "@/types/list";
import { useWindowSize } from "@/components/utils/composables/window-size";

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

const { isMobile } = useWindowSize();

const getPaginationSummaryText = () => {
  if (isMobile.value) {
    return (
      props.paginationData.firstRecord +
      " - " +
      props.paginationData.lastRecord +
      "\xa0\xa0z\xa0\xa0" +
      props.paginationData.totalRecords
    );
  }

  return (
    "Wyświetlono\xa0\xa0" +
    props.paginationData.firstRecord +
    " - " +
    props.paginationData.lastRecord +
    "\xa0\xa0z\xa0\xa0" +
    props.paginationData.totalRecords +
    " wyników"
  );
};

const isPageActive = (pageNumber: number) => {
  return pageNumber === props.paginationData.currentPage;
};

const getPaginationActiveItemClass = (pageNumber: number) => {
  if (isPageActive(pageNumber)) {
    return "pagination-pages__item--active";
  }
  return "";
};

const getLeftArrowClasses = () => {
  if (props.currentPage <= 1) {
    return "pagination__arrow--disabled";
  }
  return "";
};

const getRightArrowClasses = () => {
  if (props.currentPage >= props.paginationData.totalPages) {
    return "pagination__arrow--disabled";
  }
  return "";
};

const changePage = (pageNumber: number) => {
  if (pageNumber <= 0 || pageNumber > props.paginationData.totalPages) {
    return;
  }
  emit("update:currentPage", pageNumber);
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
