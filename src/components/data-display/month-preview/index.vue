<script lang="ts">
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";

export default {
  name: "CMonthPreview",
  components: { CSkeletonLoader },
};
</script>

<script setup lang="ts">
import { useDateHelpers } from "@/composables/date-helpers/index";
import { isDate, isEqual } from "date-fns";

const props = defineProps({
  dates: {
    type: Array as () => Date[],
    default: () => [],
  },
});

const { fullMonthGrid } = useDateHelpers();

const getActiveItemClass = (itemDate: Date) => {
  if (props.dates.some((date) => isEqual(date, itemDate))) {
    return "month-preview__item--active";
  }

  return "";
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
