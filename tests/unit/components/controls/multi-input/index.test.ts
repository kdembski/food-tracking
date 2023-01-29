import { DOMWrapper, mount, VueWrapper } from "@vue/test-utils";
import CMultiInput from "@/components/controls/multi-input/index.vue";
import { MultiInputValuesTypes } from "@/types/components/multi-input";

describe("Multi Input Component", () => {
  let wrapper: VueWrapper<any>;
  let addButton: DOMWrapper<HTMLButtonElement>;
  let removeButtons: DOMWrapper<HTMLButtonElement>[];

  beforeEach(async () => {
    wrapper = mount(CMultiInput, {
      props: { modelValue: [1, 2], label: "label" },
      global: global.settings,
    });

    addButton = wrapper.find(".multi-input__add-button").find("button");
    removeButtons = wrapper.findAll(".multi-input__remove-button");
  });

  it("Should set values based on modelValue prop", async () => {
    expect(wrapper.vm.values).toEqual([1, 2]);
  });

  it("Should emit update:modelValue on values change", async () => {
    await addButton.trigger("click");
    expect(wrapper.emitted<any>()["update:modelValue"][0][0]).toEqual([
      1,
      2,
      undefined,
    ]);
  });

  it("Should render corrent amount of items", async () => {
    const items = wrapper.findAll(".multi-input__item");
    expect(items.length).toEqual(2);
  });

  it("Should remove item on remove btn click", async () => {
    await removeButtons[1].trigger("click");
    expect(wrapper.emitted<any>()["update:modelValue"][0][0]).toEqual([1]);
  });

  it("Should add object if type prop is set to 'object'", async () => {
    const testObject = {
      test: "test",
    };
    await wrapper.setProps({
      emptyObject: testObject,
      type: MultiInputValuesTypes.OBJECT,
    });

    await addButton.trigger("click");
    expect(wrapper.emitted<any>()["update:modelValue"][0][0]).toEqual([
      1,
      2,
      testObject,
    ]);
  });
});
