import { ref, Ref, watch, nextTick, ComputedRef } from "vue";
import { useWindowSize } from "../../../../composables/window-size";

export function useDropdownPosition(
  dropdown: Ref<HTMLElement | null>,
  isOpen: ComputedRef<boolean>
) {
  const { windowHeight, isMobile } = useWindowSize();
  const dropdownDirection = ref("bottom");

  const getAvailableSpaceBelow = (parentBottomPosition: number) => {
    const bottomOffset = 10;
    return windowHeight.value - parentBottomPosition - bottomOffset;
  };

  const setDropdownPosition = () => {
    const parent = dropdown.value?.parentElement;
    const dropdownHeight = dropdown.value?.clientHeight || 0;
    const parentBottomPosition = parent?.getBoundingClientRect().bottom || 0;

    const spaceBelow = getAvailableSpaceBelow(parentBottomPosition);
    dropdownDirection.value = spaceBelow > dropdownHeight ? "bottom" : "top";
  };

  watch(isOpen, async (value) => {
    if (!value || isMobile.value) {
      return;
    }

    await nextTick();
    setDropdownPosition();
  });

  watch(windowHeight, () => {
    setDropdownPosition();
  });

  return { dropdownDirection };
}
