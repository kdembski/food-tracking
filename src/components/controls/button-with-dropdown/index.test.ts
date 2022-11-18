import { mount, DOMWrapper } from "@vue/test-utils";
import CButtonWithDropdown from "./index.vue";
import { createStore } from "vuex";

describe("Button Component", () => {
  let wrapper: any = null;
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

  it("Should close dropdown on option click", async () => {
    await button.trigger("click");
    await jest.runAllTimers();
    expect(wrapper.vm.isDropdownOpen).toBe(true);

    await wrapper.findAll("li")[1].trigger("click");
    expect(wrapper.vm.isDropdownOpen).toBe(false);
  });

  it("Should close dropdown when clicked away from component", async () => {
    wrapper.vm.isDropdownOpen = true;
    await wrapper.vm.onClickAway({ path: [] });
    expect(wrapper.vm.isDropdownOpen).toBe(false);
  });

  it("Should NOT close dropdown when clicked away from component if button was clicked", async () => {
    wrapper.vm.isDropdownOpen = true;
    await wrapper.vm.onClickAway({ path: [wrapper.vm.buttonRef.button] });
    expect(wrapper.vm.isDropdownOpen).toBe(true);
  });
});
