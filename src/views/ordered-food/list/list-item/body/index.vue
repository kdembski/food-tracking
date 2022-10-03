<script lang="ts">
import CDisplayTags from "@/components/data-display/display-tags/index.vue";
import CLink from "@/components/utils/link/index.vue";

export default {
  name: "OrderedFoodListItemBody",
  components: { CDisplayTags, CLink },
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
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
