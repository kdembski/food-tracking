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
import { computed, onBeforeMount, watch } from "vue";
import { useRoute } from "vue-router";
import ApiService from "./services/api.service";
import { useStore } from "vuex";

const store = useStore();

const theme = computed(() => store.state.theme);
watch(
  theme,
  (value) => {
    document.documentElement.setAttribute("data-theme", value);
  },
  { immediate: true }
);

const layoutComponentName = computed(() => {
  const layoutType = useRoute().meta.layout;
  return (layoutType || "default") + "-layout";
});

onBeforeMount(() => {
  ApiService.setHeader();
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

body {
  color: var(--text-primary);
}

a {
  all: unset;
}

@media screen and (min-width: $screen-md) {
  * {
    &::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 100px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--text-tetriary);
      border-radius: 100px;
      border: 4px transparent solid;
      background-clip: padding-box;
    }
  }
}
</style>
