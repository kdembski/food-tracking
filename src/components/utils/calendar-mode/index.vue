<script lang="ts">
import CButton from "@/components/controls/button/index.vue";

export default {
  name: "CCalendarMode",
  components: { CButton },
};
</script>

<script setup lang="ts">
import { onMounted } from "vue";

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

const isMonthlyMode = () => {
  return props.mode === "MONTHLY";
};

const isWeeklyMode = () => {
  return props.mode === "WEEKLY";
};

const initMode = () => {
  setMode("WEEKLY");
};

defineExpose({
  isMonthlyMode,
  isWeeklyMode,
});

onMounted(() => {
  initMode();
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
