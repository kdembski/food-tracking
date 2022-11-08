import { useStore } from "vuex";
import { computed } from "vue";
import { useWindowSize } from "./window-size";

export function useTooltip() {
  const { windowWidth, isMobile } = useWindowSize();
  const store = useStore();
  let closeTimeout = 0;
  let openTimeout = 0;

  const isOpen = computed(() => {
    return store.state.isTooltipOpen;
  });

  const activeCustomContent = computed(() => {
    return store.state.tooltipConfig.activeCustomContent;
  });

  const open = ({
    parent,
    width,
    withCustomContent,
    activeCustomContent,
    text,
  }: {
    parent: HTMLElement;
    width: number;
    withCustomContent?: boolean;
    activeCustomContent?: string;
    text?: string;
  }) => {
    if (isMobile.value) {
      return;
    }

    const {
      bottom: parentBottom,
      left: parentLeft,
      width: parentWidth,
    } = parent.getBoundingClientRect();

    const top = parentBottom + 20;
    const left = getLeftPosition(parentLeft, parentWidth, width);

    clearTimeout(closeTimeout);
    clearTimeout(openTimeout);
    openTimeout = setTimeout(
      () => {
        store.commit("setTooltipConfig", {
          top,
          left,
          width,
          text,
          withCustomContent,
          activeCustomContent,
        });
        store.commit("setIsTooltipOpen", true);
      },
      isOpen.value ? 0 : 200
    );
  };

  const getLeftPosition = (
    parentLeft: number,
    parentWidth: number,
    width: number
  ) => {
    const left = parentLeft + parentWidth / 2 - width / 2;

    if (left < 10) {
      return 10;
    }

    if (left + width > windowWidth.value - 10) {
      return windowWidth.value - width - 10;
    }

    return left;
  };

  const close = () => {
    clearTimeout(openTimeout);
    closeTimeout = setTimeout(() => {
      store.commit("setIsTooltipOpen", false);
    }, 50);
  };

  const getTooltipEvents = ({
    width,
    text,
    withCustomContent,
    activeCustomContent,
  }: {
    width: number;
    text?: string;
    withCustomContent?: boolean;
    activeCustomContent?: string;
  }) => {
    return {
      mouseenter: (e: any) => {
        if (e.currentTarget !== e.target) {
          return;
        }

        open({
          parent: e.currentTarget,
          width,
          text,
          withCustomContent,
          activeCustomContent,
        });
      },
      mouseleave: (e: any) => {
        if (e.currentTarget !== e.target) {
          return;
        }

        close();
      },
    };
  };

  return {
    open,
    close,
    activeCustomContent,
    getTooltipEvents,
  };
}
