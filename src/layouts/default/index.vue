<script lang="ts">
import CSideBar from "@/components/navigation/side-bar/index.vue";
import CTopBar from "@/components/navigation/top-bar/index.vue";
import CBottomBar from "@/components/navigation/bottom-bar/index.vue";

export default {
  name: "DefaultLayout",
  components: { CTopBar, CSideBar, CBottomBar },
};
</script>

<script setup lang="ts">
import { ref, Ref, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useWindowSize } from "@/composables/window-size";

const navItems = ref([
  { route: "/calendar", label: "Kalendarz", icon: ["far", "calendar"] },
  { route: "/recipes", label: "Przepisy", icon: "utensils" },
  { route: "/ordered", label: "Zamawiane", icon: "box-open" },
  { route: "/", label: "Składniki", icon: "cheese" },
  { route: "/", label: "Zakupy", icon: "cart-shopping" },
  { route: "/", label: "Statystyki", icon: "chart-line" },
]);

const store = useStore();
const route = useRoute();
const container: Ref<HTMLElement | undefined> = ref();

const { isMobile } = useWindowSize();

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
