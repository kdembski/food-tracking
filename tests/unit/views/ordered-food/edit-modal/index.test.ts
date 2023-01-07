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
      single: {
        id: 1,
      },
    };

    getters = {
      getTags: () => ["tag1"],
    };

    actions = {
      update: jest.fn(),
      create: jest.fn(),
      load: jest.fn(),
      loadTags: jest.fn().mockImplementation(() => Promise.resolve(["tag1"])),
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
    expect(actions.loadTags).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.orderedFoodTags).toEqual(["tag1"]);
  });

  it("Should load and set ordered food on component mount", async () => {
    expect(actions.load).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.orderedFood).toEqual({
      id: 1,
    });

    await wrapper.setProps({
      isOpen: false,
    });
    expect(actions.load).toHaveBeenCalledTimes(1);
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
    expect(actions.update).toHaveBeenCalledTimes(1);
    expect(actions.create).toHaveBeenCalledTimes(0);

    await wrapper.setProps({
      orderedFoodId: null,
    });

    await wrapper.vm.submit();
    expect(actions.update).toHaveBeenCalledTimes(1);
    expect(actions.create).toHaveBeenCalledTimes(1);
  });
});
