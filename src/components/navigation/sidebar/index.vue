<script lang="ts">
import CDesktopSidebar from "./desktop-sidebar/index.vue";
import CMobileSidebar from "./mobile-sidebar/index.vue";

export default {
  name: "CSidebar",
  components: { CDesktopSidebar, CMobileSidebar },
};
</script>

<script setup lang="ts">
import { useWindowSize } from "@/composables/window-size";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const { isMobile } = useWindowSize();
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
