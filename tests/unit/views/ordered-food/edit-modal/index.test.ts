import { shallowMount } from "@vue/test-utils";
import EditOrderedFoodModal from "@/views/ordered-food/edit-modal/index.vue";
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
      loadOrderedFood: jest.fn(),
      loadOrderedFoodTags: jest
        .fn()
        .mockImplementation(() => Promise.resolve(["tag1"])),
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
        isOpen: false,
        orderedFoodId: 1,
      },
      global: global.settings,
    });

    await wrapper.setProps({
      isOpen: true,
    });
  });

  it("Should set _isOpen based on isOpen prop", async () => {
    expect(wrapper.vm._isOpen).toBe(true);
  });

  it("Should load and set tags on component mount", async () => {
    expect(actions.loadOrderedFoodTags).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.orderedFoodTags).toEqual(["tag1"]);
  });

  it("Should load and set ordered food on component mount", async () => {
    expect(actions.loadOrderedFood).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.orderedFood).toEqual({
      id: 1,
    });

    await wrapper.setProps({
      isOpen: false,
    });
    expect(actions.loadOrderedFood).toHaveBeenCalledTimes(1);
  });

  it("Should get submit button label based on isAddingNewFood value", async () => {
    expect(wrapper.vm.getSubmitButtonLabel()).toEqual("Zapisz");
    await wrapper.setProps({
      orderedFoodId: null,
    });
    expect(wrapper.vm.getSubmitButtonLabel()).toEqual("Dodaj");
  });

  it("Should get title based on isAddingNewFood value", async () => {
    expect(wrapper.vm.getTitle()).toEqual("Edytuj zamawiane jedzenie");
    await wrapper.setProps({
      orderedFoodId: null,
    });
    expect(wrapper.vm.getTitle()).toEqual("Dodaj zamawiane jedzenie");
  });

  it("Should trigger correct store action based on isAddingNewFood value on submit", async () => {
    await wrapper.vm.submit();
    expect(actions.updateOrderedFood).toHaveBeenCalledTimes(1);
    expect(actions.createOrderedFood).toHaveBeenCalledTimes(0);

    await wrapper.setProps({
      orderedFoodId: null,
    });

    await wrapper.vm.submit();
    expect(actions.updateOrderedFood).toHaveBeenCalledTimes(1);
    expect(actions.createOrderedFood).toHaveBeenCalledTimes(1);
  });
});
