import { DropdownOption } from "@/types/components/utils/dropdown";
import { computed, Ref } from "vue";

export function useAutocompleteOptions(
  props: { options: DropdownOption[]; enableAddingOption: boolean },
  emits: { (event: "addOption", option: DropdownOption): void },
  selectedValue: Ref<string | number | null>,
  _inputValue: Ref<string>
) {
  const filteredOptions = computed(() => {
    return props.options?.filter((option: DropdownOption) => {
      return option.label?.simplify().includes(_inputValue.value?.simplify());
    });
  });

  const isOptionExisting = (value: string | number) => {
    return props.options.some((option) => option.value === value);
  };

  const selectOption = (option: DropdownOption) => {
    if (!isOptionExisting(option.value)) {
      option.label = option.value.toString();
      emits("addOption", option);
    }

    selectedValue.value = option.value;
    _inputValue.value = option.label;
  };

  const getDropdownOptions = (): DropdownOption<string | number>[] => {
    if (filteredOptions.value.length > 0 || !props.enableAddingOption) {
      return filteredOptions.value;
    }

    const newOption = {
      value: _inputValue.value,
      label: "Dodaj " + _inputValue.value + "...",
    };
    return [newOption];
  };

  return {
    filteredOptions,
    selectOption,
    getDropdownOptions,
  };
}
