import { State } from "@/types/store";
import { Store } from "vuex";

export function useTooltipDirective(store: Store<State>) {
  let closeTimeout = 0;
  let openTimeout = 0;

  const openTooltip = (
    parent: EventTarget | null,
    text?: string,
    withCustomContent?: boolean,
    activeCustomContent?: string,
    delay = 800
  ) => {
    const isOpen = store.state.isTooltipOpen;

    clearTimeout(closeTimeout);
    clearTimeout(openTimeout);
    openTimeout = window.setTimeout(
      () => {
        removeActiveCustomContent();
        store.commit("setTooltipConfig", {
          parent,
          text,
          withCustomContent,
          activeCustomContent,
        });
        appendActiveCustomContent();

        store.commit("setIsTooltipOpen", true);
      },
      isOpen ? 0 : delay
    );
  };

  const closeTooltip = (delay = 150) => {
    clearTimeout(openTimeout);
    closeTimeout = window.setTimeout(() => {
      store.commit("setIsTooltipOpen", false);
    }, delay);
  };

  const appendActiveCustomContent = () => {
    const activeCustomContent = store.state.tooltipConfig.activeCustomContent;
    if (!activeCustomContent) {
      return;
    }

    const customContent = document
      .getElementById(activeCustomContent)
      ?.cloneNode(true) as HTMLElement;

    if (!customContent) {
      return;
    }

    customContent.style.display = "block";
    customContent.id = activeCustomContent + "-clone";

    const tooltipContent = document.getElementById("tooltip-content");
    tooltipContent?.append(customContent);
  };

  const removeActiveCustomContent = () => {
    const activeCustomContent = store.state.tooltipConfig.activeCustomContent;
    if (!activeCustomContent) {
      return;
    }

    const customContent = document.getElementById(
      activeCustomContent + "-clone"
    );
    if (!customContent) {
      return;
    }

    customContent.remove();
  };

  const onMouseLeave = (e: MouseEvent) => {
    if (e.currentTarget !== e.target) {
      return;
    }

    closeTooltip();
  };

  let onMouseEnter: (e: MouseEvent) => void;

  const tooltipDirective = {
    mounted: (
      el: HTMLElement,
      bounding: {
        value: {
          text?: string;
          withCustomContent?: boolean;
          activeCustomContent?: string;
          delay?: number;
        };
      }
    ) => {
      onMouseEnter = (e: MouseEvent) => {
        if (e.currentTarget !== e.target) {
          return;
        }

        openTooltip(
          e.currentTarget,
          bounding.value.text,
          bounding.value.withCustomContent,
          bounding.value.activeCustomContent,
          bounding.value.delay
        );
      };

      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    },

    unmounted: (el: HTMLElement) => {
      closeTooltip(0);
      el.removeEventListener("mouseenter", onMouseEnter);
      el.removeEventListener("mouseleave", onMouseLeave);
    },
  };

  return {
    tooltipDirective,
  };
}
