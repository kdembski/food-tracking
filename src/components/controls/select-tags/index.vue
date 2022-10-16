<script lang="ts">
import CTags from "@/components/utils/tags/index.vue";
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";
import Item from "./item/index.vue";

export default {
  name: "CSelectTags",
  components: { CTags, Item, CSkeletonLoader },
};
</script>

<script setup lang="ts">
import { computed, ref, Ref } from "vue";
import { Tag } from "@/types/components/tags";

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

const sortTags = (tags: Array<Tag>) => {
  return sortOutSelectedTags(tags);
};

const isTagSelected = (tag: Tag) => {
  return _selectedTags.value.some((tagName) => tagName === tag.name);
};

const sortOutSelectedTags = (tags: Array<Tag>) => {
  return tags.sort((tag) => {
    if (isTagSelected(tag)) {
      return -1;
    }

    return 1;
  });
};

const container: Ref<HTMLElement | undefined> = ref();

const getLoaderItemsCount = () => {
  const containerWidth = container.value?.clientWidth;
  return Math.floor((containerWidth || 0) / 70);
};

const getHalfOfLoaderItemsCount = () => {
  return Math.floor(getLoaderItemsCount() / 2);
};

const getLoaderRowGridTemplateColumns = () => {
  return "grid-template-columns: repeat(" + getLoaderItemsCount() + ", 1fr);";
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
