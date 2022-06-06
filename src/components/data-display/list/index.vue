<script lang="ts">
import CInput from "@/components/controls/input/index.vue";
export default {
  name: "CList",
  components: { CInput },
};
</script>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    required: true,
  },
  getItemColumnValue: {
    type: Function,
    default: (value: string | number) => value,
  },
  searchPhrase: {
    type: String,
    default: "",
  },
});

const emit = defineEmits<{
  (e: "update:searchPhrase", value: string): void;
}>();

const _searchPhrase = computed({
  get(): string {
    return props.searchPhrase;
  },
  set(value: string) {
    emit("update:searchPhrase", value);
  },
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
