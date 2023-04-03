import { ref, watch, Ref, ComputedRef, nextTick } from "vue";
import { DropdownOption } from "@/types/components/utils/dropdown";
import { useWindowSize } from "@/composables/window-size";
import { useAutocompleteOptions } from "./options";

export function useAutocompleteValues(
  props: any,
  emits: any,
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

  const setSelectedIfInputValueIsMatchingAnyOption = (value: string) => {
    if (isLoading.value) {
      return;
    }

    const matchingOption = getOptionMatchingInputValue(value);
    if (!matchingOption) {
      selectedValue.value = null;
      return;
    }

    if (!props.enableSetSelectedWhenInputMatchAnyOption) {
      return;
    }

    if (isMobile.value) {
      input.value?.blur();
    }

    selectOption(matchingOption);
  };

  const getOptionMatchingInputValue = (value: string) => {
    const matchingOption = filteredOptions.value.find(
      (option: DropdownOption) => option.label.simplify() === value.simplify()
    );
    return matchingOption;
  };

  //watchers
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

  //options
  const { filteredOptions, selectOption, getDropdownOptions } =
    useAutocompleteOptions(props, emits, selectedValue, _inputValue);

  return {
    selectedValue,
    _inputValue,
    filteredOptions,
    selectOption,
    getDropdownOptions,
  };
}
