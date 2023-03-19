import { shallowMount } from "@vue/test-utils";
import RecipeDetailsView from "@/views/recipes/details/index.vue";
import { createStore } from "vuex";

describe("Recipe Details View", () => {
  let wrapper: any;
  let store: any;

  beforeEach(async () => {
    store = createStore({});

    global.settings.provide = {
      store,
    };

    wrapper = shallowMount(RecipeDetailsView, {
      global: global.settings,
    });
  });

  it("Should render component", async () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
