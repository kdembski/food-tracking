import { DropdownOption } from "@/components/utils/dropdown/types/option";
import { ComputedRef, Ref } from "vue";
import { useWindowSize } from "@/components/utils/composables/window-size";

export function useEvents(
  getHoveredOptionIndex: () => number | null,
  setHoveredOptionIndex: (index: number | null) => void,
  decrementHoveredOptionIndex: () => void,
  incrementHoveredOptionIndex: () => void,
  filteredOptions: ComputedRef<Array<DropdownOption>>,
  selectOption: (option: DropdownOption) => void,
  input: Ref<HTMLInputElement | undefined>,
  inputValue: Ref<string>,
  shootingMode: ComputedRef<boolean>,
  isLoading: ComputedRef<boolean>,
  hasFocus: Ref<boolean>,
  emits: any
) {
  const { isMobile } = useWindowSize();

  const onEnter = (e: InputEvent) => {
    const hoveredOptionIndex = getHoveredOptionIndex();
    if (hoveredOptionIndex === null) {
      e.preventDefault();
      emits("enter");
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
    if (shootingMode.value) {
      return;
    }

    input.value?.blur();
  };

  const onArrowUp = (e: KeyboardEvent) => {
    e.preventDefault();
    decrementHoveredOptionIndex();
  };

  const onArrowDown = (e: KeyboardEvent) => {
    e.preventDefault();
    incrementHoveredOptionIndex();
  };

  const onInput = (e: any) => {
    if (isLoading.value) {
      e.preventDefault();
      return;
    }

    inputValue.value = e.target.value;
  };

  const scrollInputIntoViewAfterDelay = () => {
    setTimeout(() => {
      input.value?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 400);
  };

  const onInputClick = () => {
    if (isMobile.value) {
      scrollInputIntoViewAfterDelay();
      return;
    }

    input.value?.select();
  };

  const onFocus = () => {
    hasFocus.value = true;
    emits("focus");
  };

  const onBlur = () => {
    hasFocus.value = false;
    setHoveredOptionIndex(null);
    emits("blur");
  };

  return {
    onEnter,
    onArrowUp,
    onArrowDown,
    onInput,
    onInputClick,
    onBlur,
    onFocus,
  };
}
