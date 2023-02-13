import flushPromises from "flush-promises";
import { shallowMount } from "@vue/test-utils";
import IngredientsList from "@/views/ingredients/list/index.vue";
import { createStore } from "vuex";

describe("Ingredients List Component", () => {
  let wrapper: any;
  let store: any;
  let state: any;
  let actions: any;

  beforeEach(async () => {
    state = {
      isSubmitting: false,
    };

    actions = {
      delete: jest.fn().mockImplementation(() => Promise.resolve()),
    };

    store = createStore({
      modules: {
        ingredient: {
          namespaced: true,
          state,
          actions,
        },
      },
    });

    global.settings.provide = {
      store,
    };

    wrapper = shallowMount(IngredientsList, {
      global: global.settings,
    });
  });

  it("Should correctly format unit names", async () => {
    expect(
      wrapper.vm.ingredientsListColumns[3].getItemColumnValue([
        "name1",
        "name2",
      ])
    ).toEqual("name1\xa0\xa0|\xa0\xa0name2");
  });

  it("Should open edit modal on add button click", async () => {
    await wrapper.vm.onAddButtonClick();
    expect(wrapper.vm.isEditModalOpen).toBe(true);
  });

  it("Should open delete modal and set deletedIngredientId on openDeleteModal call", async () => {
    await wrapper.vm.openDeleteModal(1);
    expect(wrapper.vm.isDeleteModalOpen).toBe(true);
    expect(wrapper.vm.deletedIngredientId).toEqual(1);
  });

  it("Should trigger delete action on deleteIngredient call", async () => {
    wrapper.vm.table.handleListLoadingProccess = jest.fn();
    await wrapper.vm.openDeleteModal(1);
    await wrapper.vm.deleteIngredient();
    expect(actions.delete).toHaveBeenCalledTimes(1);
    expect(actions.delete).toHaveBeenCalledWith(expect.any(Object), 1);
    await flushPromises();
    expect(wrapper.vm.isDeleteModalOpen).toBe(false);
    expect(wrapper.vm.table.handleListLoadingProccess).toHaveBeenCalledTimes(1);
  });
});
