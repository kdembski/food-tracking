import { ListFilters } from "@/types/components/data-display/list";
import { RecipeIngredientFilterOption } from "@/types/recipes/recipeIngredient";
import { ComputedRef, Ref, computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

export function useRecipeListIngredientFilterOptions(
  searchPhrase: Ref<string>,
  isExpanded: Ref<boolean>,
  filters: ComputedRef<ListFilters>
) {
  const store = useStore();
  const isExpandable = ref(false);

  const options = computed<RecipeIngredientFilterOption[]>(() => {
    const options = store.state.recipe.ingredient.filterOptions;
    isExpandable.value = options?.length > 12;

    return sliceOptions(
      sortSelectedToFront(filterOptionsBySearchPhrase(options))
    );
  });

  const isLoading = computed(
    () =>
      store.state.recipe.ingredient.isLoadingFilterOptions ||
      store.state.ingredient.isLoadingOptions
  );

  const sliceOptions = (options: RecipeIngredientFilterOption[]) => {
    if (isExpanded.value) {
      return options;
    }
    return options?.slice(0, 12);
  };

  const filterOptionsBySearchPhrase = (
    options: RecipeIngredientFilterOption[]
  ) => {
    return options?.filter((option: RecipeIngredientFilterOption) => {
      return getIngredientName(option.id)
        ?.simplify()
        .includes(searchPhrase.value?.simplify());
    });
  };

  const sortSelectedToFront = (options: RecipeIngredientFilterOption[]) => {
    if (!options) {
      return [];
    }
    return [...options].sort((option) => {
      if (isOptionSelected(option.id)) {
        return -1;
      }

      return 1;
    });
  };

  const isOptionSelected = (id: number) => {
    return filters.value.ingredientIds?.includes(id);
  };

  const getIngredientName = (id: number) =>
    store.getters["ingredient/getNameById"](id);

  const loadIngredientOptions = () => {
    return store.dispatch("ingredient/loadOptions");
  };

  onMounted(() => {
    loadIngredientOptions();
  });

  return {
    options,
    isLoading,
    getIngredientName,
    isOptionSelected,
    isExpandable,
  };
}
