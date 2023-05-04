<script lang="ts">
import ThemeRadioButton from "../theme-radio/index.vue";
export default {
  name: "SelectTheme",
  components: { ThemeRadioButton },
};
</script>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();

const selectedTheme = computed({
  get(): string {
    return store.state.theme;
  },
  set(theme: string) {
    store.commit("setTheme", theme);
  },
});

const themes = ref([
  {
    label: "Jasny",
    code: "light",
  },
  {
    label: "Ciemny",
    code: "dark",
  },
]);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
