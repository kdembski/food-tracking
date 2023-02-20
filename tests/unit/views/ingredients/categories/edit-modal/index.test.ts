import { shallowMount } from "@vue/test-utils";
import Modal from "@/views/ingredients/categories/edit-modal/index.vue";
import { createStore } from "vuex";
import flushPromises from "flush-promises";

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

describe("Edit Category Modal", () => {
  let wrapper: any;
  let store: any;
  let categoryState: any;
  let categoryGetters: any;
  let categoryActions: any;

  beforeEach(async () => {
    categoryState = {
      isLoading: false,
      isSubmitting: false,
    };
    categoryActions = {
      load: jest.fn(),
      update: jest.fn().mockImplementation(() => Promise.resolve()),
      create: jest.fn().mockImplementation(() => Promise.resolve()),
    };

    store = createStore({
      modules: {
        ingredient: {
          namespaced: true,
          modules: {
            category: {
              namespaced: true,
              state: categoryState,
              getters: categoryGetters,
              actions: categoryActions,
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

  it("Should load category when isOpen change to true and categoryId exists", async () => {
    await wrapper.setProps({
      isOpen: false,
      categoryId: 1,
    });
    await wrapper.setProps({
      isOpen: true,
    });
    expect(categoryActions.load).toHaveBeenCalledTimes(1);
  });

  it("Should call create action, emit 'success' and close modal on submit if adding new category", async () => {
    await wrapper.vm.submit();
    await flushPromises();
    expect(categoryActions.create).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted().success).toBeTruthy();
    expect(wrapper.emitted()["update:isOpen"][0][0]).toBe(false);
  });

  it("Should call update action, emit 'success' and close modal on submit if not adding new category", async () => {
    await wrapper.setProps({
      categoryId: 1,
    });
    await wrapper.vm.submit();
    await flushPromises();
    expect(categoryActions.update).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted().success).toBeTruthy();
    expect(wrapper.emitted()["update:isOpen"][0][0]).toBe(false);
  });

  it("Should return title based on isAddingNewCategory value", async () => {
    expect(wrapper.vm.getTitle()).toEqual("Dodaj kategorię");

    await wrapper.setProps({
      categoryId: 1,
    });
    expect(wrapper.vm.getTitle()).toEqual("Edytuj kategorię");
  });

  it("Should return submit button label based on isAddingNewCategory value", async () => {
    expect(wrapper.vm.getSubmitButtonLabel()).toEqual("Dodaj");

    await wrapper.setProps({
      categoryId: 1,
    });
    expect(wrapper.vm.getSubmitButtonLabel()).toEqual("Zapisz");
  });
});
