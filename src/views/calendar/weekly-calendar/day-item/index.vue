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
import { useTooltip } from "@/composables/tooltip";
import { RouterLink } from "vue-router";
import { useWindowSize } from "@/composables/window-size";

const tooltip = useTooltip();
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
}>();

const openRecipeTooltip = (e: any) => {
  return tooltip.open({ parent: e.target, width: 125, text: "Otwórz przepis" });
};

const openCloneTooltip = (e: any) => {
  return tooltip.open({ parent: e.target, width: 74, text: "Duplikuj" });
};

const openEditTooltip = (e: any) => {
  return tooltip.open({ parent: e.target, width: 60, text: "Edytuj" });
};

const getTagsTooltipId = (id: number) => {
  return "calendar-tags-" + id;
};

const isTagsTooltipContentVisible = (id: number) => {
  return tooltip.activeCustomContent.value === getTagsTooltipId(id);
};

const openTagsTooltip = (e: any, id: string) => {
  tooltip.open({
    parent: e.target,
    width: 240,
    withCustomContent: true,
    activeCustomContent: id,
  });
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
