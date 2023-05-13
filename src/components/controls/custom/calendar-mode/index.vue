<script lang="ts">
import CButton from "@/components/controls/buttons/button/index.vue";

export default {
  name: "CCalendarMode",
  components: { CButton },
};
</script>

<script setup lang="ts">
import { useCalendarModes } from "./composables/calendar-modes";

const props = defineProps({
  mode: {
    type: String,
    required: true,
  },
});

const emits = defineEmits<{
  (event: "update:mode", value: string): void;
}>();

const setMode = (mode: string) => {
  emits("update:mode", mode);
};

const { calendarModes } = useCalendarModes();
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
