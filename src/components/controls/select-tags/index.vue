<script lang="ts">
import CTags from "@/components/utils/tags/index.vue";
import Item from "./item/index.vue";

export default {
  name: "CSelectTags",
  components: { CTags, Item },
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import { Tag } from "@/components/utils/tags/types/tags";

const props = defineProps({
  tags: {
    type: [String, Array],
    default: "",
  },
  isLoading: {
    type: Boolean,
    deafult: false,
  },
  selectedTags: {
    type: String,
    default: "",
  },
  withCounts: {
    type: Boolean,
    deafult: false,
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
    return props.selectedTags.split(",");
  },
  set(tags: Array<string>) {
    emit("update:selectedTags", tags.join(","));
  },
});

const sortTagsBySelected = (tags: Array<Tag>) => {
  return tags.sort((tag) => {
    if (_selectedTags.value.some((tagName) => tagName === tag.name)) {
      return -1;
    }

    return 1;
  });
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
