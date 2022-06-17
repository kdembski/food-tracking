<script lang="ts">
export default { name: "CTransition" };
</script>

<script setup lang="ts">
import { capitalize } from "lodash";

const props = defineProps({
  enterActiveClass: {
    type: String,
    default: "",
  },
  leaveActiveClass: {
    type: String,
    default: "",
  },
  enterFromClass: {
    type: String,
    default: "",
  },
  leaveToClass: {
    type: String,
    default: "",
  },
  dimensionDecreased: {
    type: String,
    default: "height",
    validator: (value: string) => {
      return ["height", "width"].indexOf(value) !== -1;
    },
  },
});

const getTransitionProps = () => {
  return Object.assign(
    {
      enterActiveClass: props.enterActiveClass,
      leaveActiveClass: props.leaveActiveClass,
      enterFromClass: props.enterFromClass,
      leaveToClass: props.leaveToClass,
    },
    getTransitionEvents(props.dimensionDecreased)
  );
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
<style src="./style.scss" lang="scss" scoped></style>
