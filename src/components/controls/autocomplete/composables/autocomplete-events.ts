import { SelectOption } from "@/components/controls/select/types/select";
import { ComputedRef, Ref, WritableComputedRef } from "vue";
import { useWindowSize } from "@/components/utils/composables/window-size";

export function useAutocompleteEvents(
  getHoveredOptionIndex: () => number | null,
  setHoveredOptionIndex: (index: number | null) => void,
  decrementHoveredOptionIndex: () => void,
  incrementHoveredOptionIndex: () => void,
  filteredOptions: ComputedRef<Array<SelectOption>>,
  selectOption: (option: SelectOption) => void,
  input: Ref<HTMLInputElement | undefined>,
  inputValue: Ref<string>,
  selectedValue: WritableComputedRef<string | number | null>,
  shootingMode: boolean,
  isLoading: boolean,
  hasFocus: Ref<boolean>
) {
  const onEnter = () => {
    const hoveredOptionIndex = getHoveredOptionIndex();
    if (hoveredOptionIndex === null) {
      return;
    }

    const hoveredOption = filteredOptions.value[hoveredOptionIndex];
    if (!hoveredOption) {
      return;
    }

    selectOption(hoveredOption);
    setHoveredOptionIndex(null);
    afterOptionSelectOnEnter();
  };

  const afterOptionSelectOnEnter = () => {
    if (shootingMode) {
      return;
    }

    if (!input.value) {
      return;
    }

    input.value.blur();
  };

  const onArrowUp = (e: KeyboardEvent) => {
    e.preventDefault();
    decrementHoveredOptionIndex();
  };

  const onArrowDown = (e: KeyboardEvent) => {
    e.preventDefault();
    incrementHoveredOptionIndex();
  };

  const getOptionMatchingInputValue = () => {
    const matchingOptions = filteredOptions.value.filter(
      (option) =>
        option.label.toLowerCase().removeDiacritics() ===
        inputValue.value.toLowerCase().removeDiacritics()
    );
    return matchingOptions[0];
  };

  const isInputValueMatchingAnyOption = () => {
    return !!getOptionMatchingInputValue();
  };

  const { isMobile } = useWindowSize();
  const onInput = (e: any) => {
    if (isLoading) {
      e.preventDefault();
    }

    inputValue.value = e.target.value;

    if (isInputValueMatchingAnyOption()) {
      selectOption(getOptionMatchingInputValue());

      if (isMobile.value) {
        input.value?.blur();
      }
      return;
    }

    selectedValue.value = null;
  };

  const onInputClick = () => {
    if (!input.value) {
      return;
    }

    if (isMobile.value) {
      setTimeout(() => {
        input?.value?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 400);
      return;
    }

    input.value.select();
  };

  const onBlur = () => {
    hasFocus.value = false;
    setHoveredOptionIndex(null);
  };

  return {
    onEnter,
    onArrowUp,
    onArrowDown,
    onInput,
    onInputClick,
    onBlur,
  };
}
