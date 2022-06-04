<script lang="ts">
export default { name: "CDarkModeToggle" };
</script>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

const isDarkModeEnabled = computed(() => store?.state?.isDarkModeEnabled);

const toggleDarkMode = () => {
  store.commit("toggleDarkMode");
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
