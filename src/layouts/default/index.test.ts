import { shallowMount } from "@vue/test-utils";
import DefaultLayout from "./index.vue";
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
  let wrapper: any = null;
  let store: any;
  let mutations: any;

  beforeEach(async () => {
    mutations = {
      setMainContainerScrollValue: jest.fn(),
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
    expect(wrapper.vm.getContainerMaxWidth()).toEqual("1300px");
    routeMeta.maxWidth = "unset";
    expect(wrapper.vm.getContainerMaxWidth()).toEqual("");
    routeMeta.maxWidth = 1000;
    expect(wrapper.vm.getContainerMaxWidth()).toEqual("1000px");
  });
});
