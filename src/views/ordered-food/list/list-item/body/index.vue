<script lang="ts">
import CDisplayTags from "@/components/data-display/display-tags/index.vue";
import CLink from "@/components/utils/link/index.vue";

export default {
  name: "OrderedFoodListItemBody",
  components: { CDisplayTags, CLink },
};
</script>

<script setup lang="ts">
import { useWindowSize } from "@/composables/window-size";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  addTagToSelected: {
    type: Function,
    default: () => false,
  },
});

const { isMobile } = useWindowSize();
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
