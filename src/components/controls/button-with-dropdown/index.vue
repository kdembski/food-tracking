<script lang="ts">
import CButton from "@/components/controls/button/index.vue";
import CDropdown from "@/components/utils/dropdown/index.vue";

export default {
  name: "CButtonWithDropdown",
  components: { CButton, CDropdown },
};
</script>
<script setup lang="ts">
import { ref, Ref } from "vue";
import { useDropdownProps } from "@/components/utils/dropdown/composables/props";
import { useButtonProps } from "@/components/controls/button/composables/props";

const { getDropdownProps } = useDropdownProps();
const { getButtonProps } = useButtonProps();

const props = defineProps({
  ...useDropdownProps().dropdownProps,
  ...useButtonProps().buttonProps,
});

const isDropdownOpen = ref(false);
const buttonRef: Ref<{ button: HTMLButtonElement } | undefined> = ref();

const toggleIsOpen = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const onClickAway = (e: any) => {
  const isButtonClicked = e.path.some(
    (element: HTMLElement) => element === buttonRef.value?.button
  );

  if (isButtonClicked) {
    return;
  }

  closeDropdown();
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
