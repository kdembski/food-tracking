<script lang="ts">
import CTags from "@/components/utils/tags/index.vue";
export default {
  name: "CSelectTags",
  components: { CTags },
};
</script>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  tags: {
    type: String,
    default: "",
  },
  selectedTags: {
    type: String,
    default: "",
  },
});

const emit = defineEmits<{
  (e: "update:selectedTags", tags: string): void;
}>();

const _selectedTags = computed({
  get(): Array<string> {
    if (!props.selectedTags) {
      return [];
    }
    return props.selectedTags?.split(",");
  },
  set(tags: Array<string>) {
    emit("update:selectedTags", tags.join(","));
  },
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
