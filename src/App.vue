<template>
  <component :is="layoutComponentName">
    <router-view />
  </component>
</template>

<script lang="ts">
import PlainLayout from "@/layouts/plain/index.vue";
export default { components: { PlainLayout } };
</script>

<script setup lang="ts">
import { computed, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import ApiService from "./services/api.service";

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
}
</style>
