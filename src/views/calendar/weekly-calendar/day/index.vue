<script lang="ts">
import CCard from "@/components/surfaces/card/index.vue";
import CDisplayTags from "@/components/data-display/display-tags/index.vue";
import Draggable from "vuedraggable";

export default {
  name: "WeeklyCalendarDay",
  components: { CCard, CDisplayTags, Draggable },
};
</script>

<script setup lang="ts">
import { inject, ref } from "vue";
import { useStore } from "vuex";
import { CalendarDay, CalendarItem } from "@/types/calendar";

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
});

const store = useStore();
const getFormattedDate = inject("getFormattedDate");

const onMove = () => {
  const date = props.calendarDay.date;
  const items = props.calendarDay.items;

  updateDayItemsSortOrder(items);

  items.forEach((item) => {
    store.dispatch("calendar/updateDateInCalendar", {
      date,
      ...item,
    });
  });
};

const updateDayItemsSortOrder = (items: CalendarItem[]) => {
  items.forEach((item, index) => {
    item.sortOrder = index;
  });
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
