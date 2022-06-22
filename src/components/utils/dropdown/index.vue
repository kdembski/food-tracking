<script lang="ts">
export default { name: "TDropdown" };
</script>

<script setup lang="ts">
import { SelectOption } from "@/components/controls/select/types/select";
import { computed, ref, Ref } from "vue";
import { useWindowSize } from "../composables/window-size";

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

const dropdown: Ref<HTMLElement | undefined> = ref();
const { windowHeight, isMobileKeyboardOpen } = useWindowSize();

const dropdownMaxHeight = computed(() => {
  if (!dropdown.value) {
    return 392;
  }

  const offsetBottom = isMobileKeyboardOpen.value ? 10 : 72;
  const distanceToPageBottom =
    windowHeight.value -
    dropdown.value.getBoundingClientRect().top -
    offsetBottom;

  console.log(distanceToPageBottom);
  if (distanceToPageBottom < 392) {
    return distanceToPageBottom;
  }

  return 392;
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
