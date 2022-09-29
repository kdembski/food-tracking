import { mount, DOMWrapper } from "@vue/test-utils";
import CButtonWithDropdown from "./index.vue";

describe("Button Component", () => {
  let wrapper: any = null;
  let button: DOMWrapper<HTMLButtonElement>;

  beforeEach(async () => {
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
});
