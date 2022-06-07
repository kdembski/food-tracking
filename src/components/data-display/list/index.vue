<script lang="ts">
import CInput from "@/components/controls/input/index.vue";
import CSelectTags from "@/components/controls/select-tags/index.vue";

export default {
  name: "CList",
  components: { CInput, CSelectTags },
};
</script>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
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
  availableTags: {
    type: String,
    default: "",
  },
  selectedTags: {
    type: String,
    default: "",
  },
});

const emit = defineEmits<{
  (e: "update:searchPhrase", value: string): void;
  (e: "update:selectedTags", tags: string): void;
}>();

const _searchPhrase = computed({
  get(): string {
    return props.searchPhrase;
  },
  set(value: string) {
    emit("update:searchPhrase", value);
  },
});

const _selectedTags = computed({
  get(): string {
    return props.selectedTags;
  },
  set(tags: string) {
    emit("update:selectedTags", tags);
  },
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
