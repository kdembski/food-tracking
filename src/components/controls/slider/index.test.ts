import { mount } from "@vue/test-utils";
import CSlider from "./index.vue";

describe("Slider Component", () => {
  let wrapper: any = null;

  beforeEach(async () => {
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      disconnect: jest.fn(),
      observe: jest.fn(),
      unobserve: jest.fn(),
    }));

    wrapper = mount(CSlider, {
      attrs: {
        id: "test-id",
      },
      props: {
        modelValue: 1,
        options: [
          {
            value: 1,
            label: "one",
          },
          {
            value: 2,
            label: "two",
          },
          {
            value: 3,
            label: "three",
          },
        ],
      },
      global: global.settings,
    });
  });

  it("Should render with default props", async () => {
    wrapper = mount(CSlider, { global: global.settings });
    expect(wrapper.vm.options).toEqual([]);
  });

  it("Should set selected based on modelValue prop", async () => {
    expect(wrapper.vm.selected).toEqual(1);
  });

  it("Should emit update:modelValue on selected change", async () => {
    const input = wrapper.find("input#test-id-1");
    await input.setChecked();
    expect(input.element.checked).toBe(true);
    expect(wrapper.emitted()["update:modelValue"][0][0]).toEqual(2);
  });

  it("Should add full width class to container if fullWidth is set to true", async () => {
    await wrapper.setProps({
      fullWidth: true,
    });
    expect(wrapper.classes()).toContain("slider--full-width");
  });

  it("Should call resizeObserver observe on mounted", async () => {
    expect(wrapper.vm.activeItemResizeObserver.observe).toHaveBeenCalled();
  });

  it("Should call resizeObserver unobserve on unmounted", async () => {
    await wrapper.unmount();
    expect(wrapper.vm.activeItemResizeObserver.unobserve).toHaveBeenCalled();
  });
});
