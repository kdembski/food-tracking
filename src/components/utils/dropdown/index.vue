<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";
import CTransition from "@/components/utils/transition/index.vue";

export default {
  name: "CDropdown",
  components: { CButton, CSkeletonLoader, CTransition },
};
</script>

<script setup lang="ts">
import { DropdownOption } from "@/types/components/utils/dropdown";
import { ref, Ref, computed } from "vue";
import { useDropdownPosition } from "./composables/position";
import { useWindowSize } from "../../../composables/window-size";
import { useDropdownProps } from "./composables/props";
import { useStore } from "vuex";

const { isMobile, windowHeight, isMobileKeyboardOpen } = useWindowSize();
const store = useStore();

const props = defineProps(useDropdownProps().dropdownProps);

const emit = defineEmits<{
  (e: "listMouseout"): void;
  (e: "optionMouseover", index: number): void;
  (e: "optionClick", option: DropdownOption): void;
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

const isMobileDropdownOpen = computed(() => store.state.isMobileDropdownOpen);

const closeDropdown = () => {
  _isOpen.value = false;
};

const emitListMouseout = () => {
  emit("listMouseout");
};

const emitOptionMouseover = (index: number) => {
  emit("optionMouseover", index);
};

const onOptionClick = (option: DropdownOption) => {
  option.action?.();
  emit("optionClick", option);
};

const dropdown: Ref<HTMLElement | null> = ref(null);

const { dropdownDirection } = useDropdownPosition(
  dropdown,
  computed(() => props.isOpen)
);

const getDropdownClasses = () => {
  const sizeClass = "dropdown--" + props.size;

  return [sizeClass, getDropdownDirectionClass()];
};

const getDropdownDirectionClass = () => {
  if (!isMobile.value) {
    return "dropdown--" + dropdownDirection.value;
  }
  return "";
};

const getDropdownMaxHeight = () => {
  if (isMobile.value && props.withMobileKeyboard) {
    return "max-height: 175px";
  }

  if (isMobile.value) {
    return "max-height: " + Math.floor(windowHeight.value / 2) + "px";
  }

  return "";
};

const getOptionLabelWithHighlight = (label: string) => {
  const simplifiedSearchPhrase = props.searchPhrase?.simplify();
  const simplifiedLabel = label?.simplify();

  if (!simplifiedSearchPhrase) {
    return label;
  }

  const highlightStart = simplifiedLabel.indexOf(simplifiedSearchPhrase);
  const highlightEnd = highlightStart + simplifiedSearchPhrase.length;
  return (
    label.slice(0, highlightStart) +
    "<strong>" +
    label.slice(highlightStart, highlightEnd) +
    "</strong>" +
    label.slice(highlightEnd, label.length)
  );
};

const getTransitionProps = () => {
  return {
    dimensionDecreased: isMobile.value ? "height" : "none",
    enterActiveClass: isMobileDropdownOpen.value
      ? "dropdown__transition--delayed-enter-active"
      : "dropdown__transition-enter-active",
    leaveActiveClass: "dropdown__transition-leave-active",
    enterFromClass: "dropdown__transition-enter-from",
    leaveToClass: "dropdown__transition-leave-to",
  };
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
