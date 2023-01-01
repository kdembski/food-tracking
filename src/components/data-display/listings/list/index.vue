<script lang="ts">
import ListLoader from "./loader/index.vue";

export default {
  name: "CList",
  components: { ListLoader },
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
});

const itemsCount = computed(() => props.items.length);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
