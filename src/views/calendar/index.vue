<script lang="ts">
import CCalendarMode from "@/components/controls/custom/calendar-mode/index.vue";
import MonthlyCalendar from "./monthly-calendar/index.vue";
import WeeklyCalendar from "./weekly-calendar/index.vue";
import CButton from "@/components/controls/buttons/button/index.vue";
import CSelectMembers from "@/components/controls/custom/select-members/index.vue";
import CInput from "@/components/controls/inputs/input/index.vue";

export default {
  name: "CalendarView",
  components: {
    CCalendarMode,
    MonthlyCalendar,
    WeeklyCalendar,
    CButton,
    CSelectMembers,
    CInput,
  },
};
</script>

<script setup lang="ts">
import { useStore } from "vuex";
import { ref, provide, nextTick, computed } from "vue";
import { useDateHelpers } from "@/composables/date-helpers/index";
import { useWindowSize } from "@/composables/window-size";
import { useCalendarModes } from "@/components/controls/custom/calendar-mode/composables/calendar-modes";

const { calendarModes, isMonthlyMode, isWeeklyMode } = useCalendarModes();
const { isMobile } = useWindowSize();
const store = useStore();

const monthlyCalendar = ref();
const weeklyCalendar = ref();
const calendarMode = ref(calendarModes.WEEKLY);
const selectedMembers = ref([]);
const isLoading = computed(() => store.state.calendar.isLoadingDays);

const onArrowLeftClick = async () => {
  decrementDate();
  await nextTick();
  loadCalendar();
};

const onArrowRightClick = async () => {
  incrementDate();
  await nextTick();
  loadCalendar();
};

const loadCalendar = () => {
  if (isWeeklyMode(calendarMode.value)) {
    weeklyCalendar.value?.loadWeeklyCalendar(selectedMembers.value);
  }

  if (isMonthlyMode(calendarMode.value)) {
    monthlyCalendar.value?.loadMonthlyCalendar(selectedMembers.value);
  }
};

const {
  getFormattedDate,
  firstDateInMonth,
  allDatesInMonth,
  fullMonthGrid,
  firstDateInWeek,
  getWeekDays,
  allDatesInWeek,
  incrementDate,
  decrementDate,
  getDateRange,
} = useDateHelpers(calendarMode);

provide("getFormattedDate", getFormattedDate);
provide("getWeekDays", getWeekDays);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
