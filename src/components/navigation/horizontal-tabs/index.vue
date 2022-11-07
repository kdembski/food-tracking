<script lang="ts">
export default {
  name: "CHorizontalTabs",
};
</script>

<script setup lang="ts">
import { computed, ref, Ref, watch, onMounted, onBeforeUnmount } from "vue";
import { NavigationItem } from "@/types/components/horizontal-tabs";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  items: {
    type: Array as () => Array<NavigationItem>,
    default: () => [],
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
});

const itemsRef: Ref<Array<HTMLElement>> = ref([]);

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

const getContainerClasses = () => {
  const classes = [];

  if (props.fullWidth) {
    classes.push("horizontal-tabs--full-width");
  }

  return classes;
};

const getActiveOptionIndex = () => {
  const activeOption = props.items.find((item) => item.code === selected.value);

  if (!activeOption) {
    return -1;
  }

  return props.items.indexOf(activeOption);
};

const activeItemRef = computed(() => {
  const activeOptionIndex = getActiveOptionIndex();
  return itemsRef.value[activeOptionIndex];
});

const getActiveIndicatorStyle = () => {
  if (!activeItemRef.value) {
    return;
  }

  const activeItemWidth = activeItemRef.value.getBoundingClientRect().width;
  const activeItemOffsetLeft = activeItemRef.value.offsetLeft;

  return {
    width: activeItemWidth + "px",
    left: activeItemOffsetLeft + "px",
  };
};

const activeIndicatorStyle: Ref<
  | {
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

onBeforeUnmount(() => {
  activeItemResizeObserver.unobserve(activeItemRef.value);
});
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
