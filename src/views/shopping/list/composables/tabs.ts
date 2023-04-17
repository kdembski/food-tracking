import { ShoppingListNavItems } from "@/types/shopping/list";
import { ref } from "vue";

export function useShoppingListNavigationTabs() {
  const tabs = [
    { code: ShoppingListNavItems.DEFAULT, label: "Bez podziału" },
    { code: ShoppingListNavItems.BY_RECIPE, label: "Według przepisów" },
    { code: ShoppingListNavItems.BY_CATEGORY, label: "Według kategorii" },
  ];

  const selectedTab = ref(ShoppingListNavItems.DEFAULT);

  const isDefaultSelected = () =>
    selectedTab.value === ShoppingListNavItems.DEFAULT;
  const isByRecipeSelected = () =>
    selectedTab.value === ShoppingListNavItems.BY_RECIPE;
  const isByCategorySelected = () =>
    selectedTab.value === ShoppingListNavItems.BY_CATEGORY;

  return {
    selectedTab,
    tabs,
    isDefaultSelected,
    isByCategorySelected,
    isByRecipeSelected,
  };
}
