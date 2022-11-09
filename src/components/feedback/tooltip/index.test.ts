import { provide } from "vue";
import { mount } from "@vue/test-utils";
import CTooltip from "./index.vue";
import { createStore } from "vuex";
import { mount as composableMount } from "vue-composable-tester";
import { useTooltip } from "@/composables/tooltip";

describe("Tooltip Component", () => {
  let wrapper: any = null;
  let store: any;
  let state: any;
  let tooltip: any;
  let mutations: any;
  let parentRect: any;
  let parent: any;

  beforeEach(async () => {
    parentRect = {
      bottom: 10,
      left: 20,
      width: 30,
    };
    parent = {
      getBoundingClientRect: () => parentRect,
    };

    window.ResizeObserver = jest.fn().mockImplementation((callback) => ({
      disconnect: jest.fn(),
      observe: jest.fn(),
      unobserve: jest.fn(),
      callback,
    }));

    state = {
      isTooltipOpen: true,
      tooltipConfig: {
        left: 10,
        top: 10,
        width: 100,
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

    tooltip = composableMount(() => useTooltip(), {
      provider: () => {
        provide("store", store);
      },
    }).result;

    jest.useFakeTimers();
    wrapper = mount(CTooltip, { global: global.settings });
  });

  it("Should get tooltip styles based on tooltipConfig", async () => {
    expect(wrapper.vm.getTooltipStyle()).toEqual({
      left: "10px",
      top: "10px",
      width: "100px",
      height: "0px",
    });
  });

  it("Should get tooltip content styles based on tooltipConfig", async () => {
    expect(wrapper.vm.getTooltipContentStyle()).toEqual({
      width: "100px",
    });
  });

  it("Should set enableTransitionAll based on tooltip open state", async () => {
    await store.commit("setIsTooltipOpen", false);
    expect(wrapper.vm.enableTransitionAll).toBe(false);
    await store.commit("setIsTooltipOpen", true);
    expect(wrapper.vm.enableTransitionAll).toBe(false);
    jest.runAllTimers();
    expect(wrapper.vm.enableTransitionAll).toBe(true);
  });

  it("Should set contentHeight on ResizeObserver trigger", async () => {
    wrapper.vm.content = {
      getBoundingClientRect: () => ({
        height: 100,
      }),
    };
    await wrapper.vm.contentResizeObserver.callback();
    expect(wrapper.vm.contentHeight).toEqual(100);

    wrapper.vm.content = null;
    await wrapper.vm.contentResizeObserver.callback();
    expect(wrapper.vm.contentHeight).toEqual(0);
  });

  it("Should run observe method on mounted", async () => {
    expect(wrapper.vm.contentResizeObserver.observe).toHaveBeenCalledTimes(1);
  });

  it("Should run unobserve method on unmounted", async () => {
    await wrapper.unmount();
    expect(wrapper.vm.contentResizeObserver.unobserve).toHaveBeenCalledTimes(1);
  });

  it("Should set isTooltipOpen to true and tooltipConfig appropriate values after open method call", async () => {
    await store.commit("setIsTooltipOpen", false);

    tooltip.open({ parent, width: 100, text: "test text" });
    jest.runAllTimers();
    expect(mutations.setTooltipConfig).toHaveBeenLastCalledWith(
      expect.any(Object),
      {
        activeCustomContent: undefined,
        left: 10,
        text: "test text",
        top: 25,
        width: 100,
        withCustomContent: undefined,
      }
    );
    expect(state.isTooltipOpen).toBe(true);

    tooltip.open({ parent, width: 10, text: "test text" });
    jest.runAllTimers();
    expect(mutations.setTooltipConfig).toHaveBeenLastCalledWith(
      expect.any(Object),
      {
        activeCustomContent: undefined,
        left: 30,
        text: "test text",
        top: 25,
        width: 10,
        withCustomContent: undefined,
      }
    );

    parentRect.left = 1200;
    tooltip.open({ parent, width: 10, text: "test text" });
    jest.runAllTimers();
    expect(mutations.setTooltipConfig).toHaveBeenLastCalledWith(
      expect.any(Object),
      {
        activeCustomContent: undefined,
        left: 1004,
        text: "test text",
        top: 25,
        width: 10,
        withCustomContent: undefined,
      }
    );
  });

  it("Should call open method on mouseenter event", async () => {
    const events = tooltip.getTooltipEvents({ width: 100, text: "test text" });

    await events.mouseenter({ currentTarget: "parent1", target: "parent2" });
    expect(mutations.setTooltipConfig).toHaveBeenCalledTimes(0);

    await events.mouseenter({ currentTarget: parent, target: parent });
    jest.runAllTimers();
    expect(mutations.setTooltipConfig).toHaveBeenLastCalledWith(
      expect.any(Object),
      {
        activeCustomContent: undefined,
        left: 10,
        text: "test text",
        top: 25,
        width: 100,
        withCustomContent: undefined,
      }
    );
  });

  it("Should set isTooltipOpen to false after close method call", async () => {
    tooltip.close();
    jest.runAllTimers();
    expect(state.isTooltipOpen).toBe(false);
  });

  it("Should call close method on mouseleave event", async () => {
    const events = tooltip.getTooltipEvents({ width: 100, text: "test text" });

    await events.mouseleave({ currentTarget: "parent1", target: "parent2" });
    expect(state.isTooltipOpen).toBe(true);

    await events.mouseleave({ currentTarget: "parent1", target: "parent1" });
    jest.runAllTimers();
    expect(state.isTooltipOpen).toBe(false);
  });

  it("Should get activeCustomContent from stored tooltip config", async () => {
    expect(tooltip.activeCustomContent.value).toEqual("test custom content");
  });
});
