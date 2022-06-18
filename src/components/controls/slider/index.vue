<script lang="ts">
export default {
  name: "CSlider",
};
</script>

<script setup lang="ts">
import { computed, ref, Ref, watch, onMounted, onUnmounted } from "vue";
import { SelectOption } from "@/components/controls/select/types/select";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  options: {
    type: Array as () => Array<SelectOption>,
    default: () => [],
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
});

const items: Ref<Array<HTMLElement>> = ref([]);

const emits = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const selected = computed({
  get(): string {
    return props.modelValue;
  },
  set(value: string) {
    emits("update:modelValue", value);
  },
});

const getFullWidthClass = () => {
  if (props.fullWidth) {
    return "slider--full-width";
  }
  return "";
};

const getActiveOptionIndex = () => {
  const activeOption = props.options.find(
    (option) => option.value === selected.value
  );

  if (!activeOption) {
    return -1;
  }

  return props.options.indexOf(activeOption);
};

const activeItemRef = computed(() => {
  const activeOptionIndex = getActiveOptionIndex();
  return items.value[activeOptionIndex];
});

const getActiveIndicatorStyle = () => {
  if (!activeItemRef.value) {
    return;
  }

  const activeItemHeight = activeItemRef.value.getBoundingClientRect().height;
  const activeItemWidth = activeItemRef.value.getBoundingClientRect().width;
  const activeItemOffsetLeft = activeItemRef.value.offsetLeft;

  return {
    height: activeItemHeight + "px",
    width: activeItemWidth + "px",
    left: activeItemOffsetLeft + "px",
  };
};

const activeIndicatorStyle: Ref<
  | {
      height: string;
      width: string;
      left: string;
    }
  | undefined
> = ref();

watch(activeItemRef, () => {
  activeIndicatorStyle.value = getActiveIndicatorStyle();
});

const activeItemResizeObserver = new ResizeObserver(() => {
  activeIndicatorStyle.value = getActiveIndicatorStyle();
});

onMounted(() => {
  activeItemResizeObserver.observe(activeItemRef.value);
});

onUnmounted(() => {
  activeItemResizeObserver.unobserve(activeItemRef.value);
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
