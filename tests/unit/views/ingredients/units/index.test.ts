import { shallowMount } from "@vue/test-utils";
import UnitsList from "@/views/ingredients/units/index.vue";
import { createStore } from "vuex";

describe("Units List Component", () => {
  let wrapper: any;
  let store: any;
  let state: any;
  let actions: any;

  beforeEach(async () => {
    state = {
      isSubmitting: false,
    };

    actions = {
      delete: jest.fn(),
    };

    store = createStore({
      modules: {
        ingredient: {
          namespaced: true,
          modules: {
            unit: {
              namespaced: true,
              state,
              actions,
            },
          },
        },
      },
    });

    global.settings.provide = {
      store,
    };

    wrapper = shallowMount(UnitsList, {
      global: global.settings,
    });
  });

  it("Should trigger delete action on deleteUnit call", async () => {
    await wrapper.vm.deleteUnit(1);
    expect(actions.delete).toHaveBeenCalledTimes(1);
    expect(actions.delete).toHaveBeenCalledWith(expect.any(Object), 1);
  });
});
