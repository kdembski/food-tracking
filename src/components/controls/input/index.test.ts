import { mount } from "@vue/test-utils";
import CInput from "./index.vue";

describe("Input Component", () => {
  let wrapper: any = null;

  beforeEach(async () => {
    wrapper = mount(CInput, {
      props: { modelValue: "value" },
      global: global.settings,
    });
  });

  it("Should set input value based on modelValue prop", async () => {
    expect(wrapper.vm.value).toEqual("value");
  });

  it("Should emit update:modelValue on input value change", async () => {
    wrapper.find("input").setValue("value2");
    expect(wrapper.emitted()["update:modelValue"][0][0]).toEqual("value2");
  });

  it("Should prevent input event if isLoading prop is true", async () => {
    await wrapper.setProps({
      isLoading: true,
    });
    const e = {
      preventDefault: jest.fn(),
    };

    await wrapper.vm.onInput(e);
    expect(e.preventDefault).toHaveBeenCalledTimes(1);
  });
});
