import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import CTags from "./index.vue";

describe("Tags Component", () => {
  let wrapper: any = null;
  let store;

  beforeEach(async () => {
    store = createStore({
      getters: {
        isDarkModeEnabled: () => false,
      },
    });

    global.settings.provide = {
      store,
    };

    wrapper = mount(CTags, { global: global.settings });
  });

  it("Should render component", async () => {
    expect(wrapper.exists()).toBe(true);
  });
});
