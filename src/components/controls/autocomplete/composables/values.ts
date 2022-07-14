import { ref, watch, Ref, ComputedRef, nextTick } from "vue";
import { SelectOption } from "../../select/types/select";
import { useWindowSize } from "@/components/utils/composables/window-size";

export function useValues(
  props: any,
  emits: any,
  filteredOptions: ComputedRef<Array<SelectOption>>,
  selectOption: (option: SelectOption) => void,
  input: Ref<HTMLInputElement | undefined>,
  isLoading: ComputedRef<boolean>
) {
  const selectedValue: Ref<string | number | null> = ref(null);
  const _inputValue = ref("");
  const { isMobile } = useWindowSize();

  const getOptionLabelByValue = (value: string | number) => {
    return props.options.find((option: SelectOption) => option.value === value)
      ?.label;
  };

  const setInputValueWithSelectedLabel = (value: string | number) => {
    _inputValue.value = getOptionLabelByValue(value) || "";
  };

  watch(
    () => props.modelValue,
    async (value) => {
      selectedValue.value = value;

      if (!props.shootingMode && value) {
        await nextTick();
        setInputValueWithSelectedLabel(value);
      }
    },
    { immediate: true }
  );

  watch(selectedValue, (value) => {
    emits("update:modelValue", value);
  });

  watch(
    () => props.inputValue,
    (value) => {
      _inputValue.value = value;
    },
    { immediate: true }
  );

  const getOptionMatchingInputValue = (value: string) => {
    const matchingOption = filteredOptions.value.find(
      (option: SelectOption) => option.label.simplify() === value.simplify()
    );
    return matchingOption;
  };

  const setSelectedIfInputValueIsMatchingAnyOption = (value: string) => {
    if (isLoading.value) {
      return;
    }

    const matchingOption = getOptionMatchingInputValue(value);
    if (matchingOption) {
      selectOption(matchingOption);

      if (isMobile.value) {
        input.value?.blur();
      }
      return;
    }

    selectedValue.value = null;
  };

  watch(_inputValue, async (value) => {
    if (isLoading.value) {
      return;
    }
    emits("update:inputValue", value);

    await nextTick();
    setSelectedIfInputValueIsMatchingAnyOption(value);
  });

  watch(
    () => props.options,
    () => {
      setSelectedIfInputValueIsMatchingAnyOption(_inputValue.value);
    }
  );

  const clearSelectedAndInputValue = () => {
    selectedValue.value = null;
    _inputValue.value = "";
  };

  return {
    selectedValue,
    _inputValue,
    clearSelectedAndInputValue,
  };
}
