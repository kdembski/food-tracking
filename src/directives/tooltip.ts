import { State } from "./../types/store";
import { Store } from "vuex";

export function useTooltipDirective(store: Store<State>) {
  let closeTimeout = 0;
  let openTimeout = 0;

  const openTooltip = (
    parent: EventTarget | null,
    text?: string,
    withCustomContent?: boolean,
    activeCustomContent?: string
  ) => {
    const isOpen = store.state.isTooltipOpen;

    clearTimeout(closeTimeout);
    clearTimeout(openTimeout);
    openTimeout = setTimeout(
      () => {
        store.commit("setTooltipConfig", {
          parent,
          text,
          withCustomContent,
          activeCustomContent,
        });
        store.commit("setIsTooltipOpen", true);
      },
      isOpen ? 0 : 500
    );
  };

  const closeTooltip = (delay = 150) => {
    clearTimeout(openTimeout);
    closeTimeout = setTimeout(() => {
      store.commit("setIsTooltipOpen", false);
    }, delay);
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
          bounding.value.activeCustomContent
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
