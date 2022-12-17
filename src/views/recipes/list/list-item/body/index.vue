<script lang="ts">
import CDisplayTags from "@/components/data-display/display-tags/index.vue";
import CMonthPreview from "@/components/data-display/month-preview/index.vue";

export default {
  name: "RecipesListItemBody",
  components: {
    CDisplayTags,
    CMonthPreview,
  },
};
</script>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useDateHelpers } from "@/composables/date-helpers/index";
import {
  isEqual,
  isFuture,
  getDate,
  getMonth,
  getYear,
  addDays,
} from "date-fns";
import { useWindowSize } from "@/composables/window-size";

const { getDistanceInWords, getFormattedDate } = useDateHelpers();
const { isMobile } = useWindowSize();

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  addTagToSelected: {
    type: Function,
    default: () => false,
  },
});

const isPlanned = ref(false);
const plannedDates = computed(() => {
  return props.item.cookedDatesInCurrentMonth
    .filter((date: Date) => isFuture(date))
    .map((date: Date) => getFormattedDate(date, "d MMM"));
});

const getPreparationTime = (time: number) => {
  const minutes = time % 60;
  const hours = Math.floor(time / 60);

  if (hours && minutes) {
    return hours + "h " + minutes + "m";
  }

  if (hours) {
    return hours + "h";
  }

  return minutes + "m";
};

const getFormattedCookedDate = (cookedDate: Date) => {
  if (!cookedDate) {
    return "Brak";
  }

  const today = new Date();
  const todayWithoutHours = new Date(
    getYear(today),
    getMonth(today),
    getDate(today),
    0,
    0,
    0
  );

  const distance = getDistanceInWords(todayWithoutHours, cookedDate);

  if (isEqual(todayWithoutHours, cookedDate)) {
    return "Dzisiaj";
  }

  if (isFuture(cookedDate)) {
    isPlanned.value = true;
    return "Zaplanowane";
  }

  if (isEqual(todayWithoutHours, addDays(cookedDate, 1))) {
    return "Wczoraj";
  }

  return distance + " temu";
};

const getCookedDateTooltipText = () => {
  if (isPlanned.value) {
    return "Zaplanowane";
  }

  return (
    "Ostatnio gotowane " +
    getFormattedCookedDate(props.item.cookedDate).toLowerCase()
  );
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
