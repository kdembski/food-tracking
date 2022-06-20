import { ref, computed, ComputedRef, Ref } from "vue";

export function useSwipeScreen(
  slideLeft: (() => void) | null,
  slideRight: (() => void) | null,
  wrapperCurrentTranslateX: ComputedRef<number> | Ref<number>,
  minTranslateX: number,
  maxTranslateX: number
) {
  let touchStartX = 0;
  let touchEndX = 0;
  const wrapperTranslateX = ref("");

  const onTouchmove = (e: TouchEvent) => {
    const touchMoveX = e.changedTouches[0].screenX;
    const differenceMoveX = touchStartX - touchMoveX;
    let translateValue = -wrapperCurrentTranslateX.value - differenceMoveX;

    if (translateValue > maxTranslateX) {
      translateValue = maxTranslateX;
    }
    if (translateValue < minTranslateX) {
      translateValue = minTranslateX;
    }
    console.log(translateValue);

    wrapperTranslateX.value = translateValue + "px";
  };

  const style = computed(() => {
    if (!wrapperTranslateX.value) {
      return "";
    }

    return (
      "transform: translateX(" + wrapperTranslateX.value + "); transition: none"
    );
  });

  const onTouchstart = (e: TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX;
  };
  const onTouchend = (e: TouchEvent) => {
    touchEndX = e.changedTouches[0].screenX;
    afterSwipe();
  };

  const afterSwipe = () => {
    wrapperTranslateX.value = "";
    const touchDifferenceX = touchStartX - touchEndX;

    if (Math.abs(touchDifferenceX) < 50) {
      return;
    }
    if (touchDifferenceX > 0 && slideLeft) {
      slideLeft();
    }
    if (touchDifferenceX < 0 && slideRight) {
      slideRight();
    }
  };

  return {
    style,
    onTouchstart,
    onTouchend,
    onTouchmove,
  };
}
