<script lang="ts">
import CButton from "@/components/controls/buttons/button/index.vue";
import CButtonWithDropdown from "@/components/controls/buttons/button-with-dropdown/index.vue";
import InlineSvg from "vue-inline-svg";

export default {
  name: "RecipesListItemHeader",
  components: {
    CButton,
    InlineSvg,
    CButtonWithDropdown,
  },
};
</script>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { useWindowSize } from "@/composables/window-size";
import { Recipe } from "@/types/recipes/recipe";

const { isMobile } = useWindowSize();
const store = useStore();

const props = defineProps({
  item: {
    type: Object as () => Recipe,
    required: true,
  },
});

const openAddToShoppingListModal = () => {
  store.commit("shopping/setAddedRecipeId", props.item.id);
  store.commit("shopping/setIsAddRecipeModalOpen", true);
};

const openAddToCalendarModal = () => {
  store.commit("calendar/setAddedRecipe", props.item);
  store.commit("calendar/setIsAddToCalendarModalOpen", true);
};

const openCookidoLink = () => {
  window.open(props.item.cookidooLink, "_blank");
};

const isFilled = () => {
  return props.item.kcal;
};

const openInCookidooOption = {
  value: "",
  label: "Otwórz w Cookidoo",
  action: openCookidoLink,
  icon: "arrow-up-right-from-square",
};

const mobileDropdownOptions = computed(() => [
  {
    value: "",
    label: "Dodaj do kalendarza",
    action: openAddToCalendarModal,
    icon: ["far", "calendar-check"],
  },
  {
    value: "",
    label: "Dodaj do listy zakupów",
    action: openAddToShoppingListModal,
    icon: "cart-arrow-down",
  },
  ...(props.item.cookidooLink ? [openInCookidooOption] : []),
]);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
