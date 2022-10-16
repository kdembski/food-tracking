<script lang="ts">
export default {
  name: "CTags",
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import { Tag } from "@/types/components/tags";
import { isArray } from "lodash";

const props = defineProps({
  tags: {
    type: [String, Array as () => Array<Tag>],
    default: "",
  },
});

const convertTagsToArray = (tags: string) => {
  return tags.split(",").map((tag) => {
    return {
      name: tag,
    };
  });
};

const tagsArray = computed(() => {
  let tags = props.tags;

  if (!tags) {
    return [];
  }

  if (!isArray(tags)) {
    return convertTagsToArray(tags);
  }

  return tags;
});

const tagsCount = computed(() => tagsArray.value.length);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
