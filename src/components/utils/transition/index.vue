<template src="./template.html"></template>

<script lang="ts">
import { capitalize } from "lodash";
import { defineComponent } from "vue";

interface TransitionProps {
  enterActiveClass?: string;
  leaveActiveClass?: string;
  enterFromClass?: string;
  leaveToClass?: string;
}

export default defineComponent({
  name: "TTransition",
  props: {
    type: {
      type: String,
      default: "roll-up",
      validator: (value: string) => {
        return ["roll-up", "slide-up", "slide-right"].indexOf(value) !== -1;
      },
    },
  },

  methods: {
    getProps(): TransitionProps {
      switch (this.type) {
        case "roll-up":
          return Object.assign(
            {
              enterActiveClass: "overflow-hidden",
              leaveActiveClass: "overflow-hidden",
            },
            this.getTransitionEvents("height")
          );
        case "slide-up":
          return Object.assign(
            {
              enterFromClass: "opacity-0 transform -translate-y-10",
              leaveToClass: "opacity-0 transform -translate-y-10",
            },
            this.getTransitionEvents("height")
          );
        case "slide-right":
          return Object.assign(
            {
              enterFromClass: "opacity-0 transform -translate-x-10",
              leaveToClass: "opacity-0 transform -translate-x-10",
            },
            this.getTransitionEvents("width")
          );
        default:
          return {
            enterFromClass: "opacity-0",
            leaveToClass: "opacity-0",
          };
      }
    },

    getTransitionEvents(prop: string) {
      return {
        onBeforeEnter: (el: HTMLElement) => {
          this.beforeEnter(el, prop);
        },
        onEnter: (el: HTMLElement) => {
          this.enter(el, prop);
        },
        onAfterEnter: (el: HTMLElement) => {
          this.afterEnter(el, prop);
        },
        onBeforeLeave: (el: HTMLElement) => {
          this.beforeLeave(el, prop);
        },
        onLeave: (el: HTMLElement) => {
          this.beforeEnter(el, prop);
        },
      };
    },

    beforeEnter(el: HTMLElement, prop: string) {
      el.style[prop] = "0";
      el.style.margin = "0";
    },

    enter(el: HTMLElement, prop: string) {
      el.style[prop] = el["scroll" + capitalize(prop)] + "px";
      el.style.margin = "";
    },

    afterEnter(el: HTMLElement, prop: string) {
      el.style[prop] = "unset";
    },

    beforeLeave(el: HTMLElement, prop: string) {
      el.style[prop] = el["client" + capitalize(prop)] + "px";
    },

    leave(el: HTMLElement, prop: string) {
      setTimeout(() => {
        el.style[prop] = "0";
        el.style.margin = "0";
      }, 10);
    },
  },
});
</script>
