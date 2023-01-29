import { mount } from "@vue/test-utils";
import CCheckbox from "@/components/controls/checkbox/index.vue";

describe("Checkbox Component", () => {
  let wrapper: any;

  beforeEach(async () => {
    wrapper = mount(CCheckbox, {
      props: { modelValue: false },
      global: global.settings,
    });
  });

  it("Should set input value based on modelValue prop", async () => {
    expect(wrapper.vm.value).toEqual(false);
  });

  it("Should emit update:modelValue on input value change", async () => {
    wrapper.find("input").setChecked();
    expect(wrapper.emitted()["update:modelValue"][0][0]).toEqual(true);
  });
});
