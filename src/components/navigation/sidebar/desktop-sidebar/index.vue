<script lang="ts">
import CLogo from "./logo/index.vue";

export default {
  name: "CDesktopSidebar",
  components: { CLogo },
};
</script>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import StorageService from "@/services/storage.service";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const getIsCollapsedValue = () => {
  return !!parseInt(StorageService.getItem("isSidebarCollapsed") || "0");
};
const isCollapsed = ref(getIsCollapsedValue());

const toggleCollapsedState = () => {
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
