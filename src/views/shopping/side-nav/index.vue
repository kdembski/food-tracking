<script lang="ts">
import CButton from "@/components/controls/button/index.vue";

export default {
  name: "ShoppingSideNav",
  components: { CButton },
};
</script>

<script setup lang="ts">
import { ShoppingList } from "@/types/shopping/list";
import { useStore } from "vuex";
import { useWindowSize } from "@/composables/window-size";

const { isMobile } = useWindowSize();
const store = useStore();

const props = defineProps<{
  items?: ShoppingList[];
  activeListId?: number;
}>();

const emits = defineEmits<{
  (e: "update:activeListId", id: number): void;
  (e: "editList", id: number): void;
  (e: "addList"): void;
}>();

const isListActive = (id: number) => props.activeListId === id;
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
