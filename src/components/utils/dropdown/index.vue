<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import CLoader from "@/components/feedback/loader/index.vue";
import CTransition from "@/components/utils/transition/index.vue";

export default {
  name: "CDropdown",
  components: { CButton, CLoader, CTransition },
};
</script>

<script setup lang="ts">
import { SelectOption } from "@/components/controls/select/types/select";
import { ref, Ref, computed } from "vue";
import { useDropdownPosition } from "./composables/dropdown-position";
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
  searchPhrase: {
    type: String,
    default: "",
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (e: "listMouseout", index: number): void;
  (e: "optionMouseover", index: number): void;
  (e: "optionClick", option: SelectOption): void;
  (e: "update:isOpen", value: boolean): void;
}>();

const _isOpen = computed({
  get(): boolean {
    return props.isOpen;
  },
  set(value: boolean) {
    emit("update:isOpen", value);
  },
});

const closeDropdown = () => {
  _isOpen.value = false;
};

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

const { dropdownDirection } = useDropdownPosition(
  dropdown,
  computed(() => props.isOpen)
);

const { isMobile, windowHeight } = useWindowSize();

const getDropdownDirectionClass = () => {
  if (!isMobile.value) {
    return "dropdown--" + dropdownDirection.value;
  }
  return "";
};

const getDropdownMaxHeight = () => {
  if (isMobile.value && windowHeight.value < 600) {
    return "max-height: " + windowHeight.value / 1.75 + "px";
  }

  if (isMobile.value) {
    return "max-height: " + windowHeight.value / 2 + "px";
  }

  return "";
};

const getOptionContent = (label: string) => {
  const searchPhrase = props.searchPhrase.toLocaleLowerCase();

  if (searchPhrase) {
    return label.replace(searchPhrase, "<strong>" + searchPhrase + "</strong>");
  }

  return label;
};

const getTransitionProps = () => {
  return {
    enterActiveClass: "dropdown__transition-enter-active",
    leaveActiveClass: "dropdown__transition-leave-active",
    enterFromClass: "dropdown__transition-enter-from",
    leaveToClass: "dropdown__transition-leave-to",
  };
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
