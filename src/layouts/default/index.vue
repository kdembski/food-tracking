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
  { route: "/", label: "Przepisy", icon: "utensils" },
  { route: "/", label: "Składniki", icon: "cheese" },
  { route: "/", label: "Kalendarz", icon: "calendar-days" },
  { route: "/", label: "Lista zakupów", icon: "list" },
  { route: "/", label: "Co zamawiamy?", icon: "truck" },
]);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
