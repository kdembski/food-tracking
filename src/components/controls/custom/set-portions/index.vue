<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import CInput from "@/components/controls/input/index.vue";

export default {
  name: "CSetPortions",
  components: { CButton, CInput },
};
</script>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    default: 2,
  },
});

const emit = defineEmits<{
  (e: "update:modelValue", portions: number): void;
}>();

const portions = computed({
  get(): number {
    return props.modelValue;
  },
  set(portions: number) {
    if (!portions || portions < 1) {
      return emit("update:modelValue", 1);
    }
    emit("update:modelValue", portions);
  },
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
