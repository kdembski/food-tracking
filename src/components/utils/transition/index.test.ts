import { mount } from "@vue/test-utils";
import CTransition from "./index.vue";

describe("Transition Component", () => {
  let wrapper: any = null;

  beforeEach(async () => {
    wrapper = mount(CTransition, { global: global.settings });
  });

  it("Should render component", async () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("onBeforeEnter event should set element dimension and margin to 0", async () => {
    const element = {
      style: {
        height: null,
        margin: null,
      },
    };
    await wrapper.vm.getTransitionEvents("height").onBeforeEnter(element);
    expect(element.style.height).toEqual("0");
    expect(element.style.margin).toEqual("0");
  });

  it("onEnter event should set element dimension to scroll value of this dimension and margin to empty string", async () => {
    const element = {
      scrollHeight: 10,
      style: {
        height: null,
        margin: null,
      },
    };
    await wrapper.vm.getTransitionEvents("height").onEnter(element);
    expect(element.style.height).toEqual("10px");
    expect(element.style.margin).toEqual("");
  });

  it("onAfterEnter event should set element dimension to unset", async () => {
    const element = {
      style: {
        height: null,
      },
    };
    await wrapper.vm.getTransitionEvents("height").onAfterEnter(element);
    expect(element.style.height).toEqual("unset");
  });

  it("onBeforeLeave event should set element dimension to client value of this dimension", async () => {
    const element = {
      clientHeight: 10,
      style: {
        height: null,
      },
    };
    await wrapper.vm.getTransitionEvents("height").onBeforeLeave(element);
    expect(element.style.height).toEqual("10px");
  });

  it("onLeave event should set element dimension and margin to 0", async () => {
    jest.useFakeTimers();
    const element = {
      style: {
        height: null,
        margin: null,
      },
    };
    await wrapper.vm.getTransitionEvents("height").onLeave(element);
    jest.runAllTimers();
    expect(element.style.height).toEqual("0");
    expect(element.style.margin).toEqual("0");
  });
});
