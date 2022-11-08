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
import { RouterLink } from "vue-router";
import { useWindowSize } from "@/composables/window-size";
import { useTooltip } from "@/composables/tooltip";

const { activeCustomContent, getTooltipEvents } = useTooltip();
const { isMobile } = useWindowSize();

const props = defineProps({
  item: {
    type: Object as () => CalendarItem,
    default: () => ({}),
  },
});

const emits = defineEmits<{
  (event: "delete", id: number): void;
  (event: "edit", item: CalendarItem): void;
  (event: "clone", item: CalendarItem): void;
}>();

const getTagsTooltipId = (id: number) => {
  return "calendar-tags-" + id;
};

const isTagsTooltipContentVisible = (id: number) => {
  return activeCustomContent.value === getTagsTooltipId(id);
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
