import { mount, VueWrapper, DOMWrapper } from "@vue/test-utils";
import CAutocomplete from "./index.vue";
import flushPromises from "flush-promises";
import { config } from "@vue/test-utils";

describe("Autocomplete Component", () => {
  let wrapper: VueWrapper<any>;
  let input: DOMWrapper<HTMLInputElement>;
  let dropdown: DOMWrapper<HTMLInputElement>;

  beforeEach(async () => {
    config.global.stubs = {
      transition: false,
    };

    wrapper = mount(CAutocomplete, {
      props: {
        modelValue: 1,
        options: [
          {
            value: 1,
            label: "One",
          },
          {
            value: 2,
            label: "Two",
          },
          {
            value: 3,
            label: "Three",
          },
        ],
      },
      global: global.settings,
    });
    input = wrapper.find("input");
    jest.useFakeTimers();
  });

  it("Should set input and selected value based on modelValue prop", async () => {
    expect(wrapper.vm.selectedValue).toEqual(1);
    expect(wrapper.vm.inputValue).toEqual("One");
  });

  it("Should emit update:modelValue when input value met any of option labels", async () => {
    await input.setValue("one");
    expect(input.element.value).toEqual("One");
    expect(wrapper.emitted<any>()["update:modelValue"][0][0]).toEqual(1);
  });

  it("Should open dropdown on input click", async () => {
    await input.trigger("focus");
    await jest.runAllTimers();
    expect(wrapper.find("div.dropdown").exists()).toBe(true);
  });
});
