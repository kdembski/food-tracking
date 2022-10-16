<script lang="ts">
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";

export default {
  name: "CPagination",
  components: { CSkeletonLoader },
};
</script>

<script setup lang="ts">
import { ListPagination } from "@/types/components/list";
import { useWindowSize } from "@/composables/window-size";

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
  const firstRecord = props.paginationData.firstRecord;
  const lastRecord = props.paginationData.lastRecord;
  const totalRecords = props.paginationData.totalRecords;

  if (isMobile.value) {
    return (
      "<strong>" +
      firstRecord +
      "</strong> - <strong>" +
      lastRecord +
      "</strong>\xa0\xa0z\xa0\xa0<strong>" +
      totalRecords +
      "</strong>"
    );
  }

  return (
    "Wyświetlono \xa0<strong>" +
    firstRecord +
    "</strong> - <strong>" +
    lastRecord +
    "</strong>\xa0\xa0z\xa0\xa0<strong>" +
    totalRecords +
    (totalRecords > 1 ? "</strong> \xa0wyników" : " wyniku")
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
  if (
    pageNumber <= 0 ||
    pageNumber > props.paginationData.totalPages ||
    isPageActive(pageNumber)
  ) {
    return;
  }
  emit("update:currentPage", pageNumber);
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
