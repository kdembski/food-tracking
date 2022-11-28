import flushPromises from "flush-promises";
import { mount } from "@vue/test-utils";
import CTooltip from "./index.vue";
import { createStore } from "vuex";
import { useTooltipDirective } from "@/directives/tooltip";

describe("Tooltip Component", () => {
  let wrapper: any;
  let store: any;
  let state: any;
  let tooltipDirective: any;
  let mutations: any;
  let parent: any;

  beforeEach(async () => {
    parent = document.createElement("div");

    state = {
      isTooltipOpen: true,
      tooltipConfig: {
        parent,
        maxWidth: 200,
        text: "test text",
        withCustomContent: false,
        activeCustomContent: "test custom content",
      },
    };

    mutations = {
      setIsTooltipOpen: (state: any, value: boolean) => {
        state.isTooltipOpen = value;
      },
      setTooltipConfig: jest.fn(),
    };

    store = createStore({
      state,
      mutations,
    });

    global.settings.provide = {
      store,
    };

    tooltipDirective = useTooltipDirective(store).tooltipDirective;

    jest.useFakeTimers();
    wrapper = mount(CTooltip, { global: global.settings });
  });

  it("Should get tooltip styles based on top and left variables", async () => {
    expect(wrapper.vm.getTooltipStyle()).toEqual({
      left: "-999px",
      top: "-999px",
    });
  });

  it("Should set left and top position based on parent and content dimensions", async () => {
    document.body.appendChild(parent);
    await store.commit("setIsTooltipOpen", false);
    await flushPromises();

    expect(wrapper.vm.tooltipTop).toEqual(15);
    expect(wrapper.vm.tooltipLeft).toEqual(12);
    document.body.removeChild(parent);
  });

  it("Should set left and top position to -999 if parent not exists in DOM", async () => {
    await store.commit("setIsTooltipOpen", false);
    await flushPromises();

    expect(wrapper.vm.tooltipTop).toEqual(-999);
    expect(wrapper.vm.tooltipLeft).toEqual(-999);
  });

  it("Should prevent tooltip left position to be greater than window size", async () => {
    expect(wrapper.vm.getLeftPosition(2000, 10, 10)).toEqual(1007);
  });

  it("Should prevent tooltip left position to be lower than provided offset", async () => {
    expect(wrapper.vm.getLeftPosition(0, 10, 100)).toEqual(62);
  });

  it("Should prevent tooltip top position to be greater than window size", async () => {
    expect(wrapper.vm.getTopPosition(2000, 10, 10)).toEqual(1965);
  });

  it("Should add event listeners on tooltip directive mounted", async () => {
    jest.spyOn(parent, "addEventListener");
    await tooltipDirective.mounted(parent);
    expect(parent.addEventListener).toBeCalledWith(
      "mouseenter",
      expect.any(Function)
    );
    expect(parent.addEventListener).toBeCalledWith(
      "mouseleave",
      expect.any(Function)
    );
  });

  it("Should remove event listeners on tooltip directive unmounted", async () => {
    jest.spyOn(parent, "removeEventListener");
    await tooltipDirective.mounted(parent);
    await tooltipDirective.unmounted(parent);
    expect(parent.removeEventListener).toBeCalledWith(
      "mouseenter",
      expect.any(Function)
    );
    expect(parent.removeEventListener).toBeCalledWith(
      "mouseleave",
      expect.any(Function)
    );
  });

  it("Should open tooltip on parent mouseenter", async () => {
    await tooltipDirective.mounted(parent, { value: { text: "test text" } });
    await parent.dispatchEvent(new Event("mouseenter"));
    jest.runAllTimers();
    expect(mutations.setTooltipConfig).toHaveBeenLastCalledWith(
      expect.any(Object),
      {
        parent,
        text: "test text",
        withCustomContent: undefined,
        activeCustomContent: undefined,
      }
    );
  });

  it("Should close tooltip on parent mouseleave", async () => {
    await tooltipDirective.mounted(parent, { value: { text: "test text" } });
    await parent.dispatchEvent(new Event("mouseleave"));
    jest.runAllTimers();
    expect(state.isTooltipOpen).toBe(false);
  });
});
