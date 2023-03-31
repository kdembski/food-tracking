import flushPromises from "flush-promises";
import { shallowMount } from "@vue/test-utils";
import CustomizedTable from "@/views/ingredients/customized-table/index.vue";

describe("Customized Table Component", () => {
  let wrapper: any;
  const deleteItem = jest.fn().mockImplementation(() => Promise.resolve());

  beforeEach(async () => {
    wrapper = shallowMount(CustomizedTable, {
      props: {
        listName: "list",
        storeModuleName: "module",
        defaultFilters: {},
        columns: [],
        deleteItem,
        isSubmittingItem: false,
        addButtonLabel: "label",
      },
      global: global.settings,
    });
  });

  it("Should emit editItem event on add button click", async () => {
    await wrapper.vm.onAddButtonClick();
    expect(wrapper.emitted().editItem).toBeTruthy();
  });

  it("Should open delete modal and set deletedIngredientId on openDeleteModal call", async () => {
    await wrapper.vm.openDeleteModal({ id: 1 });
    expect(wrapper.vm.isDeleteModalOpen).toBe(true);
    expect(wrapper.vm.deletedItemId).toEqual(1);
  });

  it("Should call deleteItem prop close modal and reload list on deleteIngredient call", async () => {
    wrapper.vm.table.handleListLoadingProccess = jest.fn();
    await wrapper.vm.openDeleteModal(1);
    await wrapper.vm.deleteItem();
    await flushPromises();

    expect(deleteItem).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.isDeleteModalOpen).toBe(false);
    expect(wrapper.vm.table.handleListLoadingProccess).toHaveBeenCalledTimes(1);
  });
});
