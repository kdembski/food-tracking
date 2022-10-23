<script lang="ts">
import Draggable from "vuedraggable";
import CButton from "@/components/controls/button/index.vue";

export default {
  name: "MonthlyCalendarDay",
  components: { Draggable, CButton },
};
</script>

<script setup lang="ts">
import { inject } from "vue";
import { useStore } from "vuex";
import { CalendarDay, CalendarItem } from "@/types/calendar";
import { isToday } from "date-fns";

const props = defineProps({
  calendarDay: {
    type: Object as () => CalendarDay,
    default: () => ({}),
  },
  date: {
    type: Date,
    required: true,
  },
  isLoadingCalendar: {
    type: Boolean,
    default: false,
  },
  updateCalendarDay: {
    type: Function,
    required: true,
  },
});

const emits = defineEmits<{
  (event: "delete", id: number, date: Date): void;
}>();

const store = useStore();
const getFormattedDate = inject("getFormattedDate");

const onMove = () => {
  props.updateCalendarDay(props.calendarDay);
};

const getItemIcon = (item: CalendarItem) => {
  if (item.isRecipe) {
    return "utensils";
  }
  return "box-open";
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
