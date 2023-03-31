<script lang="ts">
export default {
  name: "ShoppingSideNav",
  components: {},
};
</script>

<script setup lang="ts">
import { ShoppingList } from "@/types/shopping/list";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps<{
  items: ShoppingList[];
}>();
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
