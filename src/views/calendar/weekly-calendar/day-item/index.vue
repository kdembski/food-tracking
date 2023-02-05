<script lang="ts">
import CDisplayTags from "@/components/data-display/display-tags/index.vue";
import CButton from "@/components/controls/button/index.vue";
import CDisplayMembers from "@/components/data-display/display-members/index.vue";

export default {
  name: "WeeklyCalendarDayItem",
  components: { CDisplayTags, CButton, CDisplayMembers },
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import { CalendarItem } from "@/types/calendar/calendar";
import { RouterLink } from "vue-router";
import { useStore } from "vuex";

const store = useStore();

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

const membersLength = computed(() => {
  return props.item.members.length;
});

const getTagsTooltipId = (id: number) => {
  return "calendar-tags-" + id;
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
