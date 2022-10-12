<script lang="ts">
export default {
  name: "SelectTagsItem",
};
</script>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  tag: {
    type: Object,
    default: () => {
      return {};
    },
  },
  selectedTags: {
    type: Array as () => Array<string>,
    default: () => [],
  },
  withCounts: {
    type: Boolean,
    deafult: false,
  },
});

const emit = defineEmits<{
  (e: "update:selectedTags", tags: Array<string>): void;
}>();

const _selectedTags = computed({
  get(): Array<string> {
    return props.selectedTags;
  },
  set(tags: Array<string>) {
    emit("update:selectedTags", tags);
  },
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
