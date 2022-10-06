<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import CLink from "@/components/utils/link/index.vue";
import InlineSvg from "vue-inline-svg";

export default {
  name: "RecipesListItemHeader",
  components: {
    CButton,
    InlineSvg,
    CLink,
  },
};
</script>

<script setup lang="ts">
import { useWindowSize } from "@/components/utils/composables/window-size";
import { Recipe } from "@/types/recipe";

const props = defineProps({
  item: {
    type: Object as () => Recipe,
    required: true,
  },
});

const emits = defineEmits<{ (e: "addToCalendar", recipe: Recipe): void }>();

const { isMobile } = useWindowSize();

const addToCalendar = () => {
  emits("addToCalendar", props.item);
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
