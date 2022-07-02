<script lang="ts">
import CSidebar from "@/components/navigation/sidebar/index.vue";

export default {
  name: "DefaultLayout",
  components: { CSidebar },
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
  { route: "/settings", label: "Ustawienia", icon: "gear" },
]);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
