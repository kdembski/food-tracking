<script lang="ts">
import CDarkModeToggle from "./dark-mode-toggle/index.vue";
export default {
  name: "CSidebar",
  components: { CDarkModeToggle },
};
</script>

<script setup lang="ts">
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import StorageService from "@/services/storage.service";
import { useWindowSize } from "@/components/utils/composables/window-size";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const { isMobile } = useWindowSize();

const getIsCollapsedValue = () => {
  if (isMobile.value) {
    return true;
  }
  return !!parseInt(StorageService.getItem("isSidebarCollapsed") || "0");
};
const isCollapsed = ref(getIsCollapsedValue());

const toggleIsCollapsed = () => {
  isCollapsed.value = !isCollapsed.value;
  StorageService.setItem("isSidebarCollapsed", isCollapsed.value ? "1" : "0");
};

const getCollapsedClass = () => {
  if (isCollapsed.value) {
    return "sidebar--collapsed";
  }
  return "";
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
