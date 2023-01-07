<script lang="ts">
import WeeklyCalendarDay from "./day/index.vue";
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";
import EditItemModal from "./edit-item-modal/index.vue";
import { CalendarItem } from "@/types/calendar/calendar";

export default {
  name: "WeeklyCalendar",
  components: { WeeklyCalendarDay, CSkeletonLoader, EditItemModal },
};
</script>

<script setup lang="ts">
import { ref, computed, Ref } from "vue";
import { useCalendar } from "../composables/calendar";

const props = defineProps({
  allDatesInWeek: {
    type: Array as () => Date[],
    required: true,
  },
});

const {
  loadCalendar: loadWeeklyCalendar,
  isLoadingCalendar,
  getCalendarDayByDate,
  deleteCalendarItem,
  updateCalendarDay,
  updateCalendarItem,
  cloneCalendarItem,
} = useCalendar(computed(() => props.allDatesInWeek));

const getContainerElement = () => {
  return isLoadingCalendar.value ? "c-skeleton-loader" : "div";
};

const isEditModalOpen = ref(false);
const editedItem: Ref<CalendarItem | undefined> = ref();
const editedItemDate: Ref<Date | undefined> = ref();

const openEditModal = (item: CalendarItem, date: Date) => {
  editedItem.value = item;
  editedItemDate.value = date;
  isEditModalOpen.value = true;
};

defineExpose({ loadWeeklyCalendar });
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
