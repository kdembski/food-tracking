<script lang="ts">
import WeeklyCalendarDay from "./day/index.vue";

export default {
  name: "WeeklyCalendar",
  components: { WeeklyCalendarDay },
};
</script>

<script setup lang="ts">
import { onBeforeMount, ref, defineExpose, Ref } from "vue";
import { useStore } from "vuex";
import { isEqual } from "date-fns";
import { CalendarDay } from "@/types/calendar";

const props = defineProps({
  allDatesInWeek: {
    type: Array as () => Date[],
    required: true,
  },
});

const store = useStore();
const calendar: Ref<CalendarDay[] | undefined> = ref();
const isLoadingCalendar = ref(false);

onBeforeMount(() => {
  loadWeeklyCalendar();
});

const loadWeeklyCalendar = async () => {
  isLoadingCalendar.value = true;
  calendar.value = await getWeeklyCalendar();
  addMissingDaysToCalendar();
  isLoadingCalendar.value = false;
};

const addMissingDaysToCalendar = () => {
  calendar.value = props.allDatesInWeek.map((date) => {
    const calendarDay = getCalendarDayByDate(date);

    if (calendarDay) {
      return calendarDay;
    }

    return {
      date,
      items: [],
    };
  });
};

const getCalendarDayByDate = (date: Date) => {
  return calendar.value?.find((day) => isEqual(day.date, date));
};

const getWeeklyCalendar = () => {
  const datesRange = {
    fromDate: props.allDatesInWeek[0],
    toDate: props.allDatesInWeek[props.allDatesInWeek.length - 1],
  };
  return store.dispatch("calendar/getCalendar", datesRange);
};

defineExpose({ loadWeeklyCalendar });
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
