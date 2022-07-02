<script lang="ts">
import CLogo from "./logo/index.vue";

export default {
  name: "CDesktopSidebar",
  components: { CLogo },
};
</script>

<script setup lang="ts">
import { RouterLink } from "vue-router";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
