import { shallowMount } from "@vue/test-utils";
import EditOrderedFoodModal from "./index.vue";
import { createStore } from "vuex";

describe("Edit Ordered Food Modal", () => {
  let wrapper: any;
  let store: any;
  let state: any;
  let getters: any;
  let actions: any;

  beforeEach(async () => {
    state = {
      orderedFood: {
        id: 1,
      },
    };

    getters = {
      getOrderedFoodTags: () => ["tag1"],
    };

    actions = {
      updateOrderedFood: jest.fn(),
      createOrderedFood: jest.fn(),
    };

    store = createStore({
      modules: {
        orderedFood: {
          namespaced: true,
          state,
          getters,
          actions,
        },
      },
    });

    global.settings.provide = {
      store,
    };

    wrapper = shallowMount(EditOrderedFoodModal, {
      props: {
        isOpen: true,
        orderedFoodId: 1,
      },
      global: global.settings,
    });
  });

  it("Should open add to calendar modal on openAddToCalendarModal call", async () => {
    wrapper.vm.openAddToCalendarModal({ test: "test" });
    expect(wrapper.vm.orderedFoodAddedToCalendar).toEqual({ test: "test" });
    expect(wrapper.vm.isAddToCalendarModalOpen).toBe(true);
  });
});
