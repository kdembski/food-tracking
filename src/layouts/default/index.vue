<script lang="ts">
import CSidebar from "@/components/navigation/sidebar/index.vue";

export default {
  name: "DefaultLayout",
  components: { CSidebar },
};
</script>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

const sidebarItems = ref([
  { route: "/recipes", label: "Przepisy", icon: "utensils" },
  { route: "/", label: "Składniki", icon: "cheese" },
  { route: "/", label: "Kalendarz", icon: "calendar-days" },
  { route: "/", label: "Zakupy", icon: "list" },
  { route: "/ordered", label: "Zamawiamy?", icon: "box-open" },
  { route: "/settings", label: "Ustawienia", icon: "gear" },
]);

const isDefaultLayoutContentScrollable = computed(
  () => store.state.isDefaultLayoutContentScrollable
);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
