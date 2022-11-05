import { nextTick } from "vue";
import { mount, VueWrapper, DOMWrapper } from "@vue/test-utils";
import CAutocomplete from "./index.vue";
import { config } from "@vue/test-utils";

describe("Autocomplete Component", () => {
  let wrapper: VueWrapper<any>;
  let input: DOMWrapper<HTMLInputElement>;

  const mountComponent = () => {
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
  };

  beforeEach(async () => {
    config.global.stubs = {
      transition: false,
    };

    mountComponent();
    input = wrapper.find("input");
    jest.useFakeTimers();
  });

  it("Should set input and selected value based on modelValue prop", async () => {
    expect(wrapper.vm.selectedValue).toEqual(1);
    expect(wrapper.vm._inputValue).toEqual("One");
    expect(wrapper.emitted<any>()["update:inputValue"][0][0]).toEqual("One");
  });

  it("Should emit update:modelValue when input value met any of option labels", async () => {
    await input.setValue("two");
    expect(input.element.value).toEqual("Two");
    expect(wrapper.vm._inputValue).toEqual("Two");
    expect(wrapper.vm.selectedValue).toEqual(2);
    expect(wrapper.emitted<any>()["update:modelValue"][0][0]).toEqual(2);
  });

  it("Should not emit update:inputValue on _inputValue change if isLoading is true", async () => {
    await wrapper.setProps({
      isLoading: true,
    });
    wrapper.vm._inputValue = "test";
    expect(wrapper.emitted<any>()["update:inputValue"]).toEqual([["One"]]);
  });

  it("Should open dropdown on input click", async () => {
    await input.trigger("focus");
    await jest.runAllTimers();
    expect(wrapper.find("div.dropdown").exists()).toBe(true);
  });

  it("Should set option when input value met any of option labels on options change", async () => {
    await input.setValue("four");
    await wrapper.setProps({
      options: [
        {
          value: 4,
          label: "Four",
        },
      ],
    });

    expect(wrapper.vm._inputValue).toEqual("Four");
    expect(wrapper.vm.selectedValue).toEqual(4);
  });

  it("Should not set option when input value met any of option labels on options change if isLoading is true", async () => {
    await wrapper.setProps({
      isLoading: true,
    });
    await input.setValue("four");
    await wrapper.setProps({
      options: [
        {
          value: 4,
          label: "Four",
        },
      ],
    });

    expect(wrapper.vm.selectedValue).toEqual(1);
  });

  it("Should filter options by input value", async () => {
    expect(wrapper.vm.filteredOptions).toStrictEqual([
      {
        value: 1,
        label: "One",
      },
    ]);
  });

  it("Should select option on dropdown option click", async () => {
    await input.setValue("");
    expect(wrapper.vm._inputValue).toEqual("");

    await input.trigger("focus");
    await jest.runAllTimers();
    await wrapper.findAll("li")[1].trigger("click");

    expect(wrapper.vm._inputValue).toEqual("Two");
  });

  it("Should add selected class to input when selected value exists", async () => {
    expect(input.classes()).toContain("autocomplete__input--option-selected");
    await wrapper.setProps({
      modelValue: null,
    });
    expect(input.classes()).not.toContain(
      "autocomplete__input--option-selected"
    );
  });

  it("Should select option by enter click using arrow down", async () => {
    await input.setValue("");
    expect(wrapper.vm._inputValue).toEqual("");

    await input.trigger("focus");
    await jest.runAllTimers();
    await input.trigger("keydown.arrow-down");
    await input.trigger("keydown.arrow-down");
    await input.trigger("keydown.arrow-down");
    await input.trigger("keydown.arrow-down");
    await input.trigger("keydown.arrow-down");
    await input.trigger("keydown.enter");

    expect(wrapper.vm._inputValue).toEqual("Two");
  });

  it("Should select option by enter click using arrow up", async () => {
    await input.setValue("");
    expect(wrapper.vm._inputValue).toEqual("");

    await input.trigger("focus");
    await jest.runAllTimers();
    await input.trigger("keydown.arrow-up");
    await input.trigger("keydown.arrow-up");
    await input.trigger("keydown.arrow-up");
    await input.trigger("keydown.arrow-up");
    await input.trigger("keydown.arrow-up");
    await input.trigger("keydown.enter");

    expect(wrapper.vm._inputValue).toEqual("Two");
  });

  it("Should add option hovered class when option is hovered", async () => {
    await input.setValue("");
    expect(wrapper.vm._inputValue).toEqual("");

    await input.trigger("focus");
    await jest.runAllTimers();
    expect(wrapper.findAll("li")[0].classes()).not.toContain(
      "dropdown__option--hovered"
    );

    await input.trigger("keydown.arrow-down");
    expect(wrapper.findAll("li")[0].classes()).toContain(
      "dropdown__option--hovered"
    );
  });

  it("Should keep focus after enter click if option is not hovered", async () => {
    const blurSpy = jest.spyOn(wrapper.vm.input, "blur");
    await input.trigger("focus");
    await jest.runAllTimers();

    await input.trigger("keydown.enter");
    expect(blurSpy).toHaveBeenCalledTimes(0);
  });

  it("Should blur input after enter click if option has been selected", async () => {
    const blurSpy = jest.spyOn(wrapper.vm.input, "blur");
    await input.trigger("focus");
    await jest.runAllTimers();

    await input.trigger("keydown.arrow-down");
    await input.trigger("keydown.enter");
    expect(blurSpy).toHaveBeenCalledTimes(1);
  });

  it("Should prevent input event if isLoading set to true", async () => {
    await wrapper.setProps({
      isLoading: true,
    });

    await input.setValue("test");
    expect(wrapper.vm._inputValue).toEqual("One");
  });

  it("Should remove selectedValue when input value not match any of options label", async () => {
    await input.setValue("On");
    expect(wrapper.emitted<any>()["update:modelValue"][0][0]).toEqual(null);
  });

  it("Should select input value on input click", async () => {
    const selectSpy = jest.spyOn(wrapper.vm.input, "select");

    await input.trigger("click");
    expect(selectSpy).toHaveBeenCalledTimes(1);
  });

  it("Should set hasFocus to false and hoveredOptionIndex to null on input blur", async () => {
    await input.trigger("focus");
    await jest.runAllTimers();
    expect(wrapper.vm.hasFocus).toEqual(true);
    await input.trigger("keydown.arrow-down");
    await input.trigger("blur");

    expect(wrapper.vm.hasFocus).toEqual(false);
    expect(wrapper.vm.getHoveredOptionIndex()).toEqual(null);
  });

  it("getDropdownOption should return new option if filteredOptions length is less than zero and enableAddingOption is true", async () => {
    expect(wrapper.vm.getDropdownOptions()).toStrictEqual([
      {
        value: 1,
        label: "One",
      },
    ]);

    await input.setValue("test");
    expect(wrapper.vm.getDropdownOptions()).toStrictEqual([]);

    await wrapper.setProps({
      enableAddingOption: true,
    });

    expect(wrapper.vm.getDropdownOptions()).toStrictEqual([
      {
        value: "test",
        label: "Dodaj test...",
      },
    ]);
  });

  it("Should emit addOption event after click on new option", async () => {
    await input.setValue("test");
    await wrapper.setProps({
      enableAddingOption: true,
    });
    await input.trigger("focus");
    await jest.runAllTimers();
    await wrapper.findAll("li")[0].trigger("click");
    expect(wrapper.emitted<any>()["addOption"][0][0]).toEqual({
      value: "test",
      label: "test",
    });
  });

  it("Should blur component after option selection by input event on mobile", async () => {
    window.innerWidth = 400;
    mountComponent();
    const blurSpy = jest.spyOn(wrapper.vm.input, "blur");
    await input.setValue("Two");
    expect(blurSpy).toHaveBeenCalledTimes(1);
  });

  it("Should scroll input into view on input click on mobile", async () => {
    let scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
    window.innerWidth = 400;
    mountComponent();

    await input.trigger("click");
    jest.runAllTimers();

    expect(scrollIntoViewMock).toHaveBeenLastCalledWith({
      behavior: "smooth",
      block: "start",
    });
  });
});
