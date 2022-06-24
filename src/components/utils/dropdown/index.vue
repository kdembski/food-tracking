<script lang="ts">
export default { name: "TDropdown" };
</script>

<script setup lang="ts">
import { SelectOption } from "@/components/controls/select/types/select";
import { ref, Ref, computed } from "vue";
import { useMaxHeight } from "./composables/max-height";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array as () => Array<SelectOption>,
    default: () => [],
  },
  disabledOptions: {
    type: Array,
    default: () => [],
  },
  getOptionClass: {
    type: Function,
    default: null,
  },
});

const emit = defineEmits<{
  (e: "listMouseout", index: number): void;
  (e: "optionMouseover", index: number): void;
  (e: "optionClick", option: SelectOption): void;
}>();

const emitListMouseout = (index: number) => {
  emit("listMouseout", index);
};

const emitOptionMouseover = (index: number) => {
  emit("optionMouseover", index);
};

const emitOptionClick = (option: SelectOption) => {
  emit("optionClick", option);
};

const dropdown: Ref<HTMLElement | null> = ref(null);

const { dropdownMaxHeight, dropdownPosition } = useMaxHeight(
  dropdown,
  computed(() => props.isOpen)
);
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
