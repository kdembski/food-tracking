<script lang="ts">
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";

export default {
  name: "CMonthPreview",
  components: { CSkeletonLoader },
};
</script>

<script setup lang="ts">
import { useDateHelpers } from "@/composables/date-helpers/index";
import { isDate, isEqual, isFuture, isThisWeek } from "date-fns";

const props = defineProps({
  dates: {
    type: Array as () => Date[],
    default: () => [],
  },
});

const { fullMonthGrid } = useDateHelpers();

const getItemClasses = (itemDate: Date) => {
  return [getActiveItemClass(itemDate), getCurrentWeekClass(itemDate)];
};

const getActiveItemClass = (itemDate: Date) => {
  if (!isDateMatchingAnyFromPropsDates(itemDate)) {
    return "";
  }

  if (isFuture(itemDate)) {
    return "month-preview__item--planned";
  }

  return "month-preview__item--cooked";
};

const getCurrentWeekClass = (itemDate: Date) => {
  if (isThisWeek(itemDate, { weekStartsOn: 1 })) {
    return "month-preview__item--current-week";
  }

  return "";
};

const isDateMatchingAnyFromPropsDates = (itemDate: Date) => {
  return props.dates.some((date) => isEqual(date, itemDate));
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
