<script lang="ts">
import CSidebar from "@/components/navigation/sidebar/index.vue";
import CTopbar from "@/components/navigation/topbar/index.vue";

export default {
  name: "DefaultLayout",
  components: { CSidebar, CTopbar },
};
</script>

<script setup lang="ts">
import { ref, Ref, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const sidebarItems = ref([
  { route: "/recipes", label: "Przepisy", icon: "utensils" },
  { route: "/ordered", label: "Zamawiane", icon: "box-open" },
  { route: "/", label: "Składniki", icon: "cheese" },
  { route: "/calendar", label: "Kalendarz", icon: "calendar-days" },
  { route: "/", label: "Zakupy", icon: "cart-shopping" },
  { route: "/", label: "Statystyki", icon: "chart-line" },
]);

const store = useStore();
const route = useRoute();
const container: Ref<HTMLElement | undefined> = ref();

const onContainerScroll = () => {
  store.commit("setMainContainerScrollValue", container.value?.scrollTop);
};

onMounted(() => {
  container.value?.addEventListener("scroll", onContainerScroll);
});

onUnmounted(() => {
  container.value?.removeEventListener("scroll", onContainerScroll);
});

const getContainerMaxWidth = () => {
  const maxWidth = route.meta.maxWidth;

  switch (maxWidth) {
    case "unset":
      return "";
    case undefined:
      return "1300px";
    default:
      return maxWidth + "px";
  }
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
