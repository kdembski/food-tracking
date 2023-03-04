import { ref, watch, Ref, ComputedRef, nextTick } from "vue";
import { DropdownOption } from "@/types/components/utils/dropdown";
import { useWindowSize } from "@/composables/window-size";

export function useValues(
  props: any,
  emits: any,
  filteredOptions: ComputedRef<Array<DropdownOption>>,
  selectOption: (option: DropdownOption) => void,
  input: Ref<HTMLInputElement | undefined>,
  isLoading: ComputedRef<boolean>
) {
  const selectedValue: Ref<string | number | null> = ref(null);
  const _inputValue = ref("");
  const { isMobile } = useWindowSize();

  const getOptionLabelByValue = (value: string | number) => {
    return props.options.find(
      (option: DropdownOption) => option.value === value
    )?.label;
  };

  const setInputValueWithSelectedLabel = (value: string | number) => {
    _inputValue.value = getOptionLabelByValue(value) || "";
  };

  watch(
    () => props.modelValue,
    async (value) => {
      selectedValue.value = value;

      if (value) {
        await nextTick();
        setInputValueWithSelectedLabel(value);
      }
    },
    { immediate: true }
  );

  watch(selectedValue, async (value) => {
    emits("update:modelValue", value);
  });

  watch(
    () => props.inputValue,
    (value) => {
      _inputValue.value = value;
    },
    { immediate: true }
  );

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

  const setSelectedIfInputValueIsMatchingAnyOption = (value: string) => {
    if (isLoading.value || !_inputValue.value) {
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

  const getOptionMatchingInputValue = (value: string) => {
    const matchingOption = filteredOptions.value.find(
      (option: DropdownOption) => option.label.simplify() === value.simplify()
    );
    return matchingOption;
  };

  return {
    selectedValue,
    _inputValue,
  };
}
