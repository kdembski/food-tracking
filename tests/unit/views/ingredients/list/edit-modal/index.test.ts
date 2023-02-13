import { shallowMount } from "@vue/test-utils";
import Modal from "@/views/ingredients/list/edit-modal/index.vue";
import { createStore } from "vuex";
import flushPromises from "flush-promises";

const emptyIngredient = "empty";
const ingredient = jest.fn();
const isAddingNewIngredient = { value: false };
const isLoadingIngredient = { value: false };
const setIngredient = jest.fn();
const updateIngredient = jest.fn().mockImplementation(() => Promise.resolve());
const createIngredient = jest.fn().mockImplementation(() => Promise.resolve());

jest.mock("@/views/ingredients/list/edit-modal/composables/ingredient", () => ({
  useIngredient: jest.fn().mockImplementation(() => ({
    emptyIngredient,
    ingredient,
    isAddingNewIngredient,
    isLoadingIngredient,
    setIngredient,
    updateIngredient,
    createIngredient,
  })),
}));

const errors = jest.fn();
const getErrorMessage = jest.fn();
const clearError = jest.fn();
const clearAllErrors = jest.fn();

jest.mock("@/composables/stored-errors", () => ({
  useStoredErrors: jest.fn().mockImplementation(() => ({
    errors,
    getErrorMessage,
    clearError,
    clearAllErrors,
  })),
}));

describe("Edit Ingredient Modal", () => {
  let wrapper: any;
  let store: any;
  let state: any;
  let actions: any;
  let categoryState: any;
  let categoryGetters: any;
  let categoryActions: any;
  let unitState: any;
  let unitGetters: any;
  let unitActions: any;

  beforeEach(async () => {
    state = {
      single: {},
    };
    actions = {
      load: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
    };

    categoryState = {
      isLoadingOptions: false,
    };
    categoryGetters = {
      options: () => [{ value: 1, label: "test" }],
    };
    categoryActions = {
      loadOptions: jest.fn(),
    };

    unitState = {
      isLoadingOptions: false,
    };
    unitGetters = {
      options: () => [{ value: 1, label: "test" }],
    };
    unitActions = {
      loadOptions: jest.fn(),
    };

    store = createStore({
      modules: {
        ingredient: {
          namespaced: true,
          state,
          actions,
          modules: {
            category: {
              namespaced: true,
              state: categoryState,
              getters: categoryGetters,
              actions: categoryActions,
            },
            unit: {
              namespaced: true,
              state: unitState,
              getters: unitGetters,
              actions: unitActions,
            },
          },
        },
      },
    });

    global.settings.provide = {
      store,
    };

    wrapper = shallowMount(Modal, {
      props: {
        isOpen: true,
      },
      global: global.settings,
    });
  });

  it("Should set _isOpen based on isOpen prop", async () => {
    expect(wrapper.vm._isOpen).toBe(true);
  });

  it("Should emit update:isOpen and clear errors", async () => {
    await wrapper.vm.closeModal();
    expect(wrapper.emitted()["update:isOpen"][0][0]).toBe(false);
    expect(clearAllErrors).toHaveBeenCalledTimes(1);
  });

  it("Should set category and unit options on isOpen change to true", async () => {
    await wrapper.setProps({
      isOpen: false,
    });
    await wrapper.setProps({
      isOpen: true,
    });
    expect(categoryActions.loadOptions).toHaveBeenCalledTimes(1);
    expect(unitActions.loadOptions).toHaveBeenCalledTimes(1);
  });

  it("Should set ingredient on isOpen change if not adding new ingredient", async () => {
    await wrapper.setProps({
      isOpen: false,
    });
    await wrapper.setProps({
      isOpen: true,
    });
    expect(setIngredient).toHaveBeenCalledTimes(1);
  });

  it("Should call createIngredient, emit 'success' and close modal on submit if adding new ingredient", async () => {
    isAddingNewIngredient.value = true;
    await wrapper.vm.submit();
    await flushPromises();
    expect(createIngredient).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted().success).toBeTruthy();
    expect(wrapper.emitted()["update:isOpen"][0][0]).toBe(false);
  });

  it("Should call updateIngredient, emit 'success' and close modal on submit if not adding new ingredient", async () => {
    isAddingNewIngredient.value = false;
    await wrapper.vm.submit();
    await flushPromises();
    expect(updateIngredient).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted().success).toBeTruthy();
    expect(wrapper.emitted()["update:isOpen"][0][0]).toBe(false);
  });

  it("Should return title based on isAddingNewIngredient value", async () => {
    isAddingNewIngredient.value = false;
    expect(wrapper.vm.getTitle()).toEqual("Edytuj składnik");

    isAddingNewIngredient.value = true;
    expect(wrapper.vm.getTitle()).toEqual("Dodaj składnik");
  });

  it("Should return submit button label based on isAddingNewIngredient value", async () => {
    isAddingNewIngredient.value = false;
    expect(wrapper.vm.getSubmitButtonLabel()).toEqual("Zapisz");

    isAddingNewIngredient.value = true;
    expect(wrapper.vm.getSubmitButtonLabel()).toEqual("Dodaj");
  });
});
