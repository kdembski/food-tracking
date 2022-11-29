import { mount, VueWrapper, DOMWrapper } from "@vue/test-utils";
import CSelect from "@/components/controls/select/index.vue";
import { config } from "@vue/test-utils";
import { createStore } from "vuex";

describe("Select Component", () => {
  let wrapper: VueWrapper<any>;
  let input: DOMWrapper<HTMLInputElement>;
  let store: any;

  const mountComponent = () => {
    store = createStore({
      state: {
        isMobileDropdownOpen: true,
      },
    });

    global.settings.provide = {
      store,
    };

    wrapper = mount(CSelect, {
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
    mountComponent();

    config.global.stubs = {
      transition: false,
    };

    input = wrapper.find("input");
    jest.useFakeTimers();
  });

  it("Should set selected based on modelValue prop", async () => {
    expect(wrapper.vm.selected).toEqual(1);
  });

  it("Should emit update:modelValue event on selected change", async () => {
    wrapper.vm.selected = 2;
    expect(wrapper.emitted<any>()["update:modelValue"][0][0]).toEqual(2);
  });

  it("Should set selected option label to input value", async () => {
    expect(input.element.value).toEqual("One");
  });

  it("Should set empty input value if selected option not exists", async () => {
    await wrapper.setProps({
      modelValue: 4,
    });
    expect(input.element.value).toEqual("");
  });

  it("Should toggle dropdown on input click", async () => {
    const blurSpy = jest.spyOn(wrapper.vm.input, "blur");

    await input.trigger("mousedown");

    await input.trigger("focus");
    await jest.runAllTimers();
    expect(wrapper.find("div.dropdown").exists()).toBe(true);
    expect(wrapper.vm.isDropdownOpen).toBe(true);

    await input.trigger("mousedown");
    expect(blurSpy).toHaveBeenCalledTimes(1);
  });

  it("Should select option on option click", async () => {
    await input.trigger("focus");
    await jest.runAllTimers();
    await wrapper.findAll("li")[1].trigger("click");
    expect(wrapper.emitted<any>()["update:modelValue"][0][0]).toEqual(2);
  });
});
