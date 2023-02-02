import { computed, ref } from "vue";
import { useStore } from "vuex";

export function useUnits() {
  const store = useStore();

  const unitOptions = ref([]);
  const isLoadingUnitOptions = computed(
    () => store.state.ingredient.unit.isLoadingOptions
  );

  const setUnitOptions = async () => {
    await store.dispatch("ingredient/unit/loadOptions");
    unitOptions.value = store.getters["ingredient/unit/options"];
  };

  return {
    unitOptions,
    isLoadingUnitOptions,
    setUnitOptions,
  };
}
