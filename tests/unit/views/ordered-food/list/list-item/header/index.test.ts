import { shallowMount } from "@vue/test-utils";
import OrderedFoodListItemHeader from "@/views/ordered-food/list/list-item/header/index.vue";
import { createStore } from "vuex";

describe("Ordered Food List Item Header", () => {
  let wrapper: any;
  let store: any;
  let calendarMutations: any;

  beforeEach(async () => {
    calendarMutations = {
      setIsAddToCalendarModalOpen: jest.fn(),
      setAddedOrderedFood: jest.fn(),
    };

    store = createStore({
      modules: {
        calendar: {
          mutations: calendarMutations,
          namespaced: true,
        },
      },
    });

    global.settings.provide = {
      store,
    };

    wrapper = shallowMount(OrderedFoodListItemHeader, {
      props: {
        item: {
          id: 1,
        },
      },
      global: global.settings,
    });
  });

  it("Should open add to calendar modal on openAddToCalendarModal call", async () => {
    wrapper.vm.openAddToCalendarModal();
    expect(calendarMutations.setAddedOrderedFood).toHaveBeenCalledWith(
      expect.any(Object),
      { id: 1 }
    );
    expect(calendarMutations.setIsAddToCalendarModalOpen).toHaveBeenCalledWith(
      expect.any(Object),
      true
    );
  });

  it("Should emit edit event on edit method call", async () => {
    wrapper.vm.edit();
    expect(wrapper.emitted().edit[0][0]).toEqual(1);
  });
});
