import { shallowMount } from "@vue/test-utils";
import Modal from "@/views/ingredients/units/edit-modal/index.vue";
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

describe("Edit Unit Modal", () => {
  let wrapper: any;
  let store: any;
  let unitState: any;
  let unitGetters: any;
  let unitActions: any;

  beforeEach(async () => {
    unitState = {
      isLoading: false,
      isSubmitting: false,
    };
    unitActions = {
      load: jest.fn(),
      update: jest.fn().mockImplementation(() => Promise.resolve()),
      create: jest.fn().mockImplementation(() => Promise.resolve()),
    };

    store = createStore({
      modules: {
        ingredient: {
          namespaced: true,
          modules: {
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

  it("Should load unit when isOpen change to true and unitId exists", async () => {
    await wrapper.setProps({
      isOpen: false,
      unitId: 1,
    });
    await wrapper.setProps({
      isOpen: true,
    });
    expect(unitActions.load).toHaveBeenCalledTimes(1);
  });

  it("Should call create action, emit 'success' and close modal on submit if adding new unit", async () => {
    await wrapper.vm.submit();
    await flushPromises();
    expect(unitActions.create).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted().success).toBeTruthy();
    expect(wrapper.emitted()["update:isOpen"][0][0]).toBe(false);
  });

  it("Should call update action, emit 'success' and close modal on submit if updating unit", async () => {
    await wrapper.setProps({
      unitId: 1,
    });
    await wrapper.vm.submit();
    await flushPromises();
    expect(unitActions.update).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted().success).toBeTruthy();
    expect(wrapper.emitted()["update:isOpen"][0][0]).toBe(false);
  });

  it("Should return title based on isAddingNewUnit value", async () => {
    expect(wrapper.vm.getTitle()).toEqual("Dodaj jednostkę");

    await wrapper.setProps({
      unitId: 1,
    });
    expect(wrapper.vm.getTitle()).toEqual("Edytuj jednostkę");
  });

  it("Should return submit button label based on isAddingNewUnit value", async () => {
    expect(wrapper.vm.getSubmitButtonLabel()).toEqual("Dodaj");

    await wrapper.setProps({
      unitId: 1,
    });
    expect(wrapper.vm.getSubmitButtonLabel()).toEqual("Zapisz");
  });
});
