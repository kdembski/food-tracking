import { mount } from "@vue/test-utils";
import CRadio from "@/components/controls/radio/index.vue";

describe("Radio Component", () => {
  let wrapper: any;

  beforeEach(async () => {
    wrapper = mount(CRadio, {
      props: { modelValue: null },
      attrs: { value: 1 },
      global: global.settings,
    });
  });

  it("Should set input value based on modelValue prop", async () => {
    expect(wrapper.vm.value).toEqual(null);
  });

  it("Should emit update:modelValue on input value change", async () => {
    wrapper.find("input").setChecked();
    expect(wrapper.emitted()["update:modelValue"][0][0]).toEqual(1);
  });
});
