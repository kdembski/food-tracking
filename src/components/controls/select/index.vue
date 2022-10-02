<script lang="ts">
import CFieldTemplate from "@/components/utils/field-template/index.vue";
import CDropdown from "@/components/utils/dropdown/index.vue";

export default {
  name: "CSelect",
  components: { CFieldTemplate, CDropdown },
};
</script>

<script setup lang="ts">
import { computed, ref, Ref } from "vue";
import { useFieldProps } from "@/components/utils/field-template/composables/field-props";
import { DropdownOption } from "@/components/utils/dropdown/types/option";
import { isEqual } from "lodash";

const { getFieldTemplateProps } = useFieldProps();

const props = defineProps({
  ...useFieldProps().fieldProps,
  modelValue: {
    type: [String, Number, Object],
    default: "",
  },
  options: {
    type: Array as () => Array<DropdownOption>,
    default: () => [],
  },
});

const emits = defineEmits<{
  (
    event: "update:modelValue",
    value: string | number | Record<string, any>
  ): void;
}>();

const selected = computed({
  get(): string | number | Record<string, any> {
    return props.modelValue;
  },
  set(value: string | number | Record<string, any>) {
    emits("update:modelValue", value);
  },
});

const isDropdownOpen = ref(false);
const input: Ref<HTMLElement | null> = ref(null);

const onMouseDown = async (e: InputEvent) => {
  if (!isDropdownOpen.value) {
    return;
  }
  e.preventDefault();
  input.value?.blur();
};

const getSelectedOptionLabel = () => {
  const selectedOption = props.options.find((option) =>
    isEqual(option.value, selected.value)
  );

  return selectedOption?.label;
};

const selectOption = (option: DropdownOption) => {
  selected.value = option.value;
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
