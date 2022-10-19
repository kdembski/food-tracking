<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import CButtonWithDropdown from "@/components/controls/button-with-dropdown/index.vue";
import CLink from "@/components/utils/link/index.vue";
import InlineSvg from "vue-inline-svg";

export default {
  name: "RecipesListItemHeader",
  components: {
    CButton,
    InlineSvg,
    CLink,
    CButtonWithDropdown,
  },
};
</script>

<script setup lang="ts">
import { useWindowSize } from "@/composables/window-size";
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

const openCookidoLink = () => {
  window.open(props.item.cookidooLink, "_blank");
};

const openInCookidooOption = {
  value: "",
  label: "Otwórz w Cookidoo",
  action: openCookidoLink,
};

const mobileDropdownOptions = [
  { value: "", label: "Dodaj do kalendarza", action: addToCalendar },
  { value: "", label: "Dodaj do listy zakupów", action: () => false },
  ...(props.item.cookidooLink ? [openInCookidooOption] : []),
];
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
