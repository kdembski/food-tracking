<template>
  <component :is="layoutComponentName">
    <router-view />
  </component>
</template>

<script lang="ts">
import PlainLayout from "@/layouts/plain/index.vue";
import DefaultLayout from "@/layouts/default/index.vue";

export default {
  components: {
    PlainLayout,
    DefaultLayout,
  },
};
</script>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import ApiService from "./services/api.service";
import { useWindowSize } from "@/components/utils/composables/window-size";
import { useStore } from "vuex";

const store = useStore();

const isDarkModeEnabled = computed(() => store.state.isDarkModeEnabled);
watch(
  isDarkModeEnabled,
  (value) => {
    if (value) {
      document.documentElement.setAttribute("data-theme", "dark");
      return;
    }
    document.documentElement.setAttribute("data-theme", "light");
  },
  { immediate: true }
);

const layoutComponentName = computed(() => {
  const layoutType = useRoute().meta.layout;
  return (layoutType || "default") + "-layout";
});

const { addResizeListener, removeResizeListener } = useWindowSize();

onBeforeMount(() => {
  ApiService.setHeader();
});

onMounted(() => {
  addResizeListener();
});

onUnmounted(() => {
  removeResizeListener();
});
</script>

<style lang="scss">
*,
*:before,
*:after {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparentize($primary-light, 0.5);
}

a {
  all: unset;
}

* {
  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 100px;
    border: 4px transparent solid;
    background-clip: padding-box;
  }
}
</style>
