import { useStore } from "vuex";
import { computed, onUnmounted } from "vue";

export function useTooltip() {
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
    const {
      bottom: parentBottom,
      left: parentLeft,
      width: parentWidth,
    } = parent.getBoundingClientRect();

    const top = parentBottom + 20;
    const left = parentLeft + parentWidth / 2 - width / 2;

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

  const close = () => {
    clearTimeout(openTimeout);
    closeTimeout = setTimeout(() => {
      store.commit("setIsTooltipOpen", false);
    }, 50);
  };

  onUnmounted(() => {
    clearTimeout(openTimeout);
    store.commit("setIsTooltipOpen", false);
  });

  return {
    open,
    close,
    activeCustomContent,
  };
}
