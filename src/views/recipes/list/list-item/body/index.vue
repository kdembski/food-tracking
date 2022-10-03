<script lang="ts">
import CDisplayTags from "@/components/data-display/display-tags/index.vue";

export default {
  name: "RecipesListItemBody",
  components: {
    CDisplayTags,
  },
};
</script>

<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  addTagAndFilter: {
    type: Function,
    required: true,
  },
});

const getPreparationTime = (time: number) => {
  const minutes = time % 60;
  const hours = Math.floor(time / 60);

  if (hours && minutes) {
    return hours + "h " + minutes + "m";
  }

  if (hours) {
    return hours + "h";
  }

  return minutes + "m";
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
