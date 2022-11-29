import { mount } from "@vue/test-utils";
import SettingsView from "@/views/settings/index.vue";
import { createStore } from "vuex";

describe("Settings View", () => {
  let wrapper: any;
  let store: any;

  beforeEach(async () => {
    store = createStore({
      state: {
        theme: "light",
      },
      mutations: {
        setTheme: (state, value) => (state.theme = value),
      },
    });

    global.settings.provide = {
      store,
    };

    wrapper = mount(SettingsView, {
      global: global.settings,
    });
  });

  it("Should render component", async () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("Should select theme on radio input click", async () => {
    const input = wrapper.find("#theme-dark");
    await input.setChecked();
    expect(store.state.theme).toEqual("dark");
  });
});
