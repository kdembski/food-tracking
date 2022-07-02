<script lang="ts">
import InlineSvg from "vue-inline-svg";

export default {
  name: "CDesktopSidebar",
  components: { InlineSvg },
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
