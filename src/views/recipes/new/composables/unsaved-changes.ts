import StorageService from "@/services/storage.service";
import { onBeforeUnmount, onMounted, ref, Ref } from "vue";
import { isEmpty } from "lodash";
import { Recipe } from "@/types/recipes/recipe";
import { RecipeIngredient } from "@/types/recipes/recipeIngredient";

export function useUnsavedChanges(
  newRecipe: Ref<Partial<Recipe>>,
  newIngredients: Ref<Partial<RecipeIngredient>[]>
) {
  const isRestoreModalOpen = ref(false);

  const isRecipeEmpty = () => {
    if (isEmpty(newRecipe.value)) {
      return true;
    }

    return Object.values(newRecipe.value).every((value) => !value);
  };

  const isIngredientsEmpty = () => {
    if (isEmpty(newIngredients.value)) {
      return true;
    }

    return newIngredients.value.every(
      (item) => isEmpty(item) || Object.values(item).every((value) => !value)
    );
  };

  const isDataEmpty = () => {
    return isRecipeEmpty() && isIngredientsEmpty();
  };

  const saveDataToStorage = () => {
    if (isDataEmpty()) {
      StorageService.removeItem("unsavedRecipeData");
      return;
    }
    StorageService.setObject("unsavedRecipeData", {
      recipe: newRecipe.value,
      ingredients: newIngredients.value,
    });
  };

  const restoreDataFromStorage = () => {
    const data = StorageService.getObject("unsavedRecipeData");
    newRecipe.value = data.recipe;
    newIngredients.value = data.ingredients;

    isRestoreModalOpen.value = false;
  };

  const shouldShowRestoreModal = () => {
    return StorageService.exists("unsavedRecipeData");
  };

  onMounted(() => {
    isRestoreModalOpen.value = shouldShowRestoreModal();
    window.addEventListener("beforeunload", saveDataToStorage);
  });

  onBeforeUnmount(() => {
    saveDataToStorage();
    window.removeEventListener("beforeunload", saveDataToStorage);
  });

  return {
    isRestoreModalOpen,
    restoreDataFromStorage,
  };
}
