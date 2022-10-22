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
import { ref } from "vue";
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

const { getDistanceInWords } = useDateHelpers();
const { isMobile } = useWindowSize();

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  addTagAndFilter: {
    type: Function,
    required: true,
  },
});

const isPlanned = ref(false);

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
  if (isEqual(cookedDate, new Date(1970, 0, 1, 1, 0, 0))) {
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

  if (isFuture(cookedDate) || isEqual(todayWithoutHours, cookedDate)) {
    isPlanned.value = true;
    return "Zaplanowane";
  }

  if (isEqual(todayWithoutHours, addDays(cookedDate, 1))) {
    return "Wczoraj";
  }

  return distance + " temu";
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
