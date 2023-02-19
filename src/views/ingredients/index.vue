<script lang="ts">
import IngredientsList from "./list/index.vue";
import UnitsList from "./units/index.vue";
import CategoriesList from "./categories/index.vue";
import CHorizontalTabs from "@/components/navigation/horizontal-tabs/index.vue";

export default {
  name: "IngredientsView",
  components: { IngredientsList, CHorizontalTabs, UnitsList, CategoriesList },
};
</script>

<script setup lang="ts">
import { ref } from "vue";
import { IngredientsNavItems } from "@/types/ingredients/ingredient";

const tabs = ref([
  { code: IngredientsNavItems.LIST, label: "Lista" },
  { code: IngredientsNavItems.UNITS, label: "Jednostki" },
  { code: IngredientsNavItems.CATEGORIES, label: "Kategorie" },
]);
const selectedTab = ref(IngredientsNavItems.LIST);

const isListActive = () => selectedTab.value === IngredientsNavItems.LIST;
const isUnitsActive = () => selectedTab.value === IngredientsNavItems.UNITS;
const isCategoriesActive = () =>
  selectedTab.value === IngredientsNavItems.CATEGORIES;
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
