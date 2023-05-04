import { shallowMount } from "@vue/test-utils";
import DefaultLayout from "@/layouts/default/index.vue";
import { createStore } from "vuex";

let routeMeta: { maxWidth: any } = {
  maxWidth: undefined,
};
jest.mock("vue-router", () => ({
  useRoute: () => ({
    meta: routeMeta,
  }),
}));

describe("Default Layout Component", () => {
  let wrapper: any;
  let store: any;
  let mutations: any;

  beforeEach(async () => {
    window.MutationObserver = jest.fn().mockImplementation(() => ({
      disconnect: jest.fn(),
      observe: jest.fn(),
      unobserve: jest.fn(),
    }));

    mutations = {
      setMainContainerScrollValue: jest.fn(),
      setIsMobileDropdownOpen: jest.fn(),
    };

    store = createStore({
      mutations,
    });

    global.settings.provide = {
      store,
    };

    wrapper = shallowMount(DefaultLayout, { global: global.settings });
  });

  it("Should render component", async () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("Should set main container scroll value to store", async () => {
    await wrapper.vm.onContainerScroll();
    expect(mutations.setMainContainerScrollValue).toHaveBeenCalledWith(
      expect.any(Object),
      0
    );
  });

  it("Should get container max height based on route meta", async () => {
    expect(wrapper.vm.getContainerMaxWidth()).toEqual("1350px");
    routeMeta.maxWidth = "unset";
    expect(wrapper.vm.getContainerMaxWidth()).toEqual("");
    routeMeta.maxWidth = 1000;
    expect(wrapper.vm.getContainerMaxWidth()).toEqual("1000px");
  });

  it("Should commit isMobileDropdownOpen on mutationObserver callback", async () => {
    await wrapper.vm.mutationObserverCallback();
    expect(mutations.setIsMobileDropdownOpen).toHaveBeenCalledTimes(1);
  });

  it("Should disconnect mutationObserver before component is unmounted", async () => {
    await wrapper.unmount();
    expect(wrapper.vm.mutationObserver.disconnect).toHaveBeenCalledTimes(1);
  });
});
