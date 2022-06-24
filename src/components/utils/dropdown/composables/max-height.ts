import { ref, Ref, watch, nextTick, ComputedRef, onMounted } from "vue";
import { useWindowSize } from "../../composables/window-size";

export function useMaxHeight(
  dropdown: Ref<HTMLElement | null>,
  isOpen: ComputedRef<boolean>
) {
  const { windowHeight, isMobileKeyboardOpen } = useWindowSize();
  const dropdownMaxHeight = ref(392);
  const dropdownPosition = ref("bottom");
  let parentHeight = 0;

  const getAvailableSpaceAbove = (
    dropdownTopPosition: number,
    dropdownBottomPosition: number
  ) => {
    const paddingY = 10;

    if (dropdownPosition.value === "top") {
      return dropdownBottomPosition - paddingY;
    }

    return dropdownTopPosition - paddingY - parentHeight - 20;
  };

  const getAvailableSpaceBelow = (
    dropdownTopPosition: number,
    dropdownBottomPosition: number
  ) => {
    const bottomOffset = isMobileKeyboardOpen.value ? 10 : 72;

    if (dropdownPosition.value === "top") {
      return (
        windowHeight.value -
        dropdownBottomPosition -
        bottomOffset -
        parentHeight -
        20
      );
    }

    return windowHeight.value - dropdownTopPosition - bottomOffset;
  };

  const setDropdownMaxHeight = () => {
    const dropdownTopPosition =
      dropdown.value?.getBoundingClientRect().top || 0;
    const dropdownBottomPosition =
      dropdown.value?.getBoundingClientRect().bottom || 0;

    const spaceAbove = getAvailableSpaceAbove(
      dropdownTopPosition,
      dropdownBottomPosition
    );
    const spaceBelow = getAvailableSpaceBelow(
      dropdownTopPosition,
      dropdownBottomPosition
    );

    const position = (spaceAbove * 4) / 5 > spaceBelow ? "top" : "bottom";

    let maxHeight = position === "top" ? spaceAbove : spaceBelow;

    if (maxHeight > 392) {
      maxHeight = 392;
    }

    dropdownMaxHeight.value = maxHeight;
    dropdownPosition.value = position;
  };

  const findFirstParentWithScroll = (
    element: HTMLElement | null
  ): HTMLElement | undefined => {
    if (!element) {
      return;
    }

    const overflowY = window.getComputedStyle(element).overflowY;
    const isScrollable = overflowY === "scroll";
    if (isScrollable) {
      return element;
    }

    return findFirstParentWithScroll(element.parentElement);
  };

  let parentWithScroll: HTMLElement | undefined;

  const onParentScroll = () => {
    setDropdownMaxHeight();
  };

  watch(isOpen, async (value) => {
    if (!value) {
      parentWithScroll?.removeEventListener("scroll", onParentScroll);
      return;
    }

    await nextTick();
    parentHeight = dropdown.value?.parentElement?.clientHeight || 0;
    setDropdownMaxHeight();
    parentWithScroll = findFirstParentWithScroll(dropdown.value);
    parentWithScroll?.addEventListener("scroll", onParentScroll);
  });

  watch([windowHeight], () => {
    setDropdownMaxHeight();
  });

  return { dropdownMaxHeight, dropdownPosition };
}
