import { ref, ComputedRef, watch } from "vue";
import { SelectOption } from "../../select/types/select";

export function useOptionHover(optionsList: ComputedRef<SelectOption[]>) {
  const hoveredOptionIndex = ref<number | null>(null);

  const isOptionHovered = (index: number) => {
    return hoveredOptionIndex.value === index;
  };

  const getHoveredOptionClass = (index: number) => {
    if (isOptionHovered(index)) {
      return "dropdown__option--hovered";
    }
    return "";
  };

  const setHoveredOptionIndex = (index: number | null) => {
    hoveredOptionIndex.value = index;
  };

  const getHoveredOptionIndex = (): number | null => {
    return hoveredOptionIndex.value;
  };

  const incrementHoveredOptionIndex = () => {
    if (hoveredOptionIndex.value === null) {
      return setHoveredOptionIndex(0);
    }

    const nextOptionIndex = hoveredOptionIndex.value + 1;
    if (nextOptionIndex > optionsList.value.length - 1) {
      return setHoveredOptionIndex(0);
    }

    setHoveredOptionIndex(nextOptionIndex);
  };

  const decrementHoveredOptionIndex = () => {
    if (hoveredOptionIndex.value === null) {
      return setHoveredOptionIndex(optionsList.value.length - 1);
    }

    const previousOptionIndex = hoveredOptionIndex.value - 1;
    if (previousOptionIndex < 0) {
      return setHoveredOptionIndex(optionsList.value.length - 1);
    }

    setHoveredOptionIndex(previousOptionIndex);
  };

  watch(optionsList, () => {
    hoveredOptionIndex.value = null;
  });

  return {
    getHoveredOptionClass,
    setHoveredOptionIndex,
    getHoveredOptionIndex,
    incrementHoveredOptionIndex,
    decrementHoveredOptionIndex,
  };
}
