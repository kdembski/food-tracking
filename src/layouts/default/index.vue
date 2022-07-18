<script lang="ts">
import CSidebar from "@/components/navigation/sidebar/index.vue";
import CTopbar from "@/components/navigation/topbar/index.vue";

export default {
  name: "DefaultLayout",
  components: { CSidebar, CTopbar },
};
</script>

<script setup lang="ts">
import { ref } from "vue";

const sidebarItems = ref([
  { route: "/recipes", label: "Przepisy", icon: "utensils" },
  { route: "/ordered", label: "Zamawiane", icon: "box-open" },
  { route: "/", label: "Składniki", icon: "cheese" },
  { route: "/", label: "Kalendarz", icon: "calendar-days" },
  { route: "/", label: "Zakupy", icon: "list" },
  { route: "/", label: "Statystyki", icon: "chart-line" },
]);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
