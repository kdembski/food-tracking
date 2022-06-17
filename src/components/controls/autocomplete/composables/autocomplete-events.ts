import { SelectOption } from "@/components/controls/select/types/select";
import { ComputedRef, Ref, WritableComputedRef } from "vue";

export function useAutocompleteEvents(
  getHoveredOptionIndex: () => number | null,
  setHoveredOptionIndex: (index: number | null) => void,
  decrementHoveredOptionIndex: () => void,
  incrementHoveredOptionIndex: () => void,
  filteredOptions: ComputedRef<Array<SelectOption>>,
  selectOption: (option: SelectOption) => void,
  afterOptionSelectWithShootingMode: () => void,
  input: Ref<HTMLInputElement | undefined>,
  inputValue: Ref<string>,
  selectedValue: WritableComputedRef<string | number | null>,
  shootingMode: boolean,
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
      afterOptionSelectWithShootingMode();
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
      (option) => option.label.toLowerCase() === inputValue.value.toLowerCase()
    );
    return matchingOptions[0];
  };

  const isInputValueMatchingAnyOption = () => {
    return !!getOptionMatchingInputValue();
  };

  const onInput = () => {
    if (isInputValueMatchingAnyOption()) {
      selectOption(getOptionMatchingInputValue());

      if (shootingMode) {
        afterOptionSelectWithShootingMode();
      }
      return;
    }

    selectedValue.value = null;
  };

  const onInputClick = () => {
    if (!input.value) {
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
