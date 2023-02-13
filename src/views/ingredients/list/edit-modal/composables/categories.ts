import { computed, ref } from "vue";
import { useStore } from "vuex";

export function useCategories() {
  const store = useStore();

  const categoryOptions = ref([]);
  const isLoadingCategoryOptions = computed(
    () => store.state.ingredient.category.isLoadingOptions
  );

  const setCategoryOptions = async () => {
    await store.dispatch("ingredient/category/loadOptions");
    categoryOptions.value = store.getters["ingredient/category/options"];
  };

  return {
    categoryOptions,
    isLoadingCategoryOptions,
    setCategoryOptions,
  };
}
