<script lang="ts">
export default { name: "TTransition" };
</script>

<script setup lang="ts">
import { capitalize } from "lodash";

interface TransitionProps {
  enterActiveClass?: string;
  leaveActiveClass?: string;
  enterFromClass?: string;
  leaveToClass?: string;
}

const props = defineProps({
  type: {
    type: String,
    default: "roll-up",
    validator: (value: string) => {
      return ["roll-up", "slide-up", "slide-right"].indexOf(value) !== -1;
    },
  },
});

const getTransitionProps = (): TransitionProps => {
  switch (props.type) {
    case "roll-up":
      return Object.assign(
        {
          enterActiveClass: "overflow-hidden",
          leaveActiveClass: "overflow-hidden",
        },
        getTransitionEvents("height")
      );
    case "slide-up":
      return Object.assign(
        {
          enterFromClass: "opacity-0 transform -translate-y-10",
          leaveToClass: "opacity-0 transform -translate-y-10",
        },
        getTransitionEvents("height")
      );
    case "slide-right":
      return Object.assign(
        {
          enterFromClass: "opacity-0 transform -translate-x-10",
          leaveToClass: "opacity-0 transform -translate-x-10",
        },
        getTransitionEvents("width")
      );
    default:
      return {
        enterFromClass: "opacity-0",
        leaveToClass: "opacity-0",
      };
  }
};

const getTransitionEvents = (prop: string) => {
  return {
    onBeforeEnter: (el: HTMLElement) => {
      beforeEnter(el, prop);
    },
    onEnter: (el: HTMLElement) => {
      enter(el, prop);
    },
    onAfterEnter: (el: HTMLElement) => {
      afterEnter(el, prop);
    },
    onBeforeLeave: (el: HTMLElement) => {
      beforeLeave(el, prop);
    },
    onLeave: (el: HTMLElement) => {
      beforeEnter(el, prop);
    },
  };
};

const beforeEnter = (el: HTMLElement, prop: string) => {
  el.style[prop] = "0";
  el.style.margin = "0";
};

const enter = (el: HTMLElement, prop: string) => {
  el.style[prop] = el["scroll" + capitalize(prop)] + "px";
  el.style.margin = "";
};

const afterEnter = (el: HTMLElement, prop: string) => {
  el.style[prop] = "unset";
};

const beforeLeave = (el: HTMLElement, prop: string) => {
  el.style[prop] = el["client" + capitalize(prop)] + "px";
};

const leave = (el: HTMLElement, prop: string) => {
  setTimeout(() => {
    el.style[prop] = "0";
    el.style.margin = "0";
  }, 10);
};
</script>

<template src="./template.html"></template>
