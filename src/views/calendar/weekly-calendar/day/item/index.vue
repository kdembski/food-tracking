<script lang="ts">
import CDisplayTags from "@/components/data-display/display-tags/index.vue";
import CButton from "@/components/controls/button/index.vue";

export default {
  name: "WeeklyCalendarDayItem",
  components: { CDisplayTags, CButton },
};
</script>

<script setup lang="ts">
import { CalendarItem } from "@/types/calendar";

const props = defineProps({
  item: {
    type: Object as () => CalendarItem,
    default: () => ({}),
  },
});

const emits = defineEmits<{
  (event: "delete", id: number): void;
}>();

const getItemIcon = () => {
  if (props.item.isRecipe) {
    return "utensils";
  }
  return "box-open";
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
