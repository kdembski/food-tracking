<script lang="ts">
import CSidebar from "@/components/navigation/sidebar/index.vue";
import CCard from "@/components/surfaces/card/index.vue";

export default {
  name: "DefaultLayout",
  components: { CSidebar, CCard },
};
</script>

<script setup lang="ts">
import { ref } from "vue";

const sidebarItems = ref([
  { route: "/recipes", label: "Przepisy", icon: "utensils" },
  { route: "/", label: "Składniki", icon: "cheese" },
  { route: "/", label: "Kalendarz", icon: "calendar-days" },
  { route: "/", label: "Lista zakupów", icon: "list" },
  { route: "/ordered", label: "Co zamawiamy?", icon: "truck" },
]);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
