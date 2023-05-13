import { mount, DOMWrapper } from "@vue/test-utils";
import CButtonWithDropdown from "@/components/controls/buttons/button-with-dropdown/index.vue";
import { createStore } from "vuex";

describe("Button Component", () => {
  let wrapper: any;
  let button: DOMWrapper<HTMLButtonElement>;
  let store: any;

  beforeEach(async () => {
    store = createStore({
      state: {
        isMobileDropdownOpen: true,
      },
    });

    global.settings.provide = {
      store,
    };

    wrapper = mount(CButtonWithDropdown, {
      props: {
        options: [
          { value: 1, label: "Label-1" },
          { value: 2, label: "Label-2" },
          { value: 3, label: "Label-3" },
        ],
      },
      global: global.settings,
    });
    button = wrapper.find("button");
    jest.useFakeTimers();
  });

  it("Should open dropdown on button click", async () => {
    await button.trigger("click");
    await jest.runAllTimers();
    expect(wrapper.find("div.dropdown").exists()).toBe(true);
  });

  it("Should close dropdown on button blur", async () => {
    await button.trigger("click");
    await jest.runAllTimers();
    expect(wrapper.vm.isDropdownOpen).toBe(true);

    await button.trigger("blur");
    expect(wrapper.vm.isDropdownOpen).toBe(false);
  });
});
