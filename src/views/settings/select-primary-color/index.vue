<script lang="ts">
import ThemeRadioButton from "../theme-radio/index.vue";
export default {
  name: "SelectPrimaryColor",
  components: { ThemeRadioButton },
};
</script>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();

const selectedPrimaryColor = computed({
  get(): string {
    return store.state.primaryColor;
  },
  set(primaryColor: string) {
    store.commit("setPrimaryColor", primaryColor);
  },
});

const colors = ref([
  {
    code: "orange",
    label: "Pomarańczowy",
  },
  {
    code: "cyan",
    label: "Morski",
  },
  {
    code: "red",
    label: "Magenta",
  },
  {
    code: "purple",
    label: "Fioletowy",
  },
  {
    code: "blue",
    label: "Niebieski",
  },
]);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
