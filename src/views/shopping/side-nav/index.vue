<script lang="ts">
import CButton from "@/components/controls/buttons/button/index.vue";
import SelectShoppingList from "../select-list/index.vue";

export default {
  name: "ShoppingSideNav",
  components: { CButton, SelectShoppingList },
};
</script>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";
import { useWindowSize } from "@/composables/window-size";

const { isMobile } = useWindowSize();
const store = useStore();

const props = defineProps<{
  activeListId?: number;
}>();

const emits = defineEmits<{
  (e: "update:activeListId", id?: number): void;
  (e: "addList"): void;
}>();

const activeListId = computed({
  get(): number | undefined {
    return props.activeListId;
  },
  set(value?: number) {
    emits("update:activeListId", value);
  },
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
