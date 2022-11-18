import { mount } from "@vue/test-utils";
import CDropdown from "./index.vue";
import { createStore } from "vuex";

describe("Dropdown Component", () => {
  let wrapper: any = null;
  let store: any;

  const mountComponent = () => {
    wrapper = mount(CDropdown, {
      props: {
        isOpen: true,
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

  store = createStore({
    state: {
      isMobileDropdownOpen: true,
    },
  });

  global.settings.provide = {
    store,
  };

  beforeEach(async () => {
    mountComponent();
  });

  afterEach(() => {
    window.innerWidth = 1204;
    window.innerHeight = 768;
  });

  it("Should set _isOpen based on isOpen prop", async () => {
    expect(wrapper.vm._isOpen).toBe(true);
  });

  it("Should render options", async () => {
    const options = wrapper.findAll("li");
    expect(options.length).toEqual(3);
  });

  it("Should show empty message when options length lower than 1", async () => {
    await wrapper.setProps({
      options: [],
    });
    expect(wrapper.find(".dropdown__empty-message").exists()).toBe(true);
  });

  it("Should show dropdown loader when isLoading is set to true", async () => {
    await wrapper.setProps({
      isLoading: true,
    });
    expect(wrapper.find(".dropdown__loader").exists()).toBe(true);
  });

  it("Should emit update:isOpen on _isOpen change", async () => {
    await wrapper.vm.closeDropdown();
    expect(wrapper.emitted()["update:isOpen"][0][0]).toBe(false);
  });

  it("Should add direction class only if not on mobile", async () => {
    expect(wrapper.vm.getDropdownDirectionClass()).toEqual("dropdown--bottom");
    window.innerWidth = 500;
    window.dispatchEvent(new Event("resize"));
    expect(wrapper.vm.getDropdownDirectionClass()).toEqual("");
  });

  it("Should set max height based on window size", async () => {
    expect(wrapper.vm.getDropdownMaxHeight()).toEqual("");

    window.innerWidth = 500;
    window.dispatchEvent(new Event("resize"));
    expect(wrapper.vm.getDropdownMaxHeight()).toEqual("max-height: 384px");

    window.innerHeight = 500;
    window.dispatchEvent(new Event("resize"));
    expect(wrapper.vm.getDropdownMaxHeight()).toEqual("max-height: 285px");
  });

  it("Should highlight label part that match the searchPhrase", async () => {
    await wrapper.setProps({
      searchPhrase: "abe",
    });
    expect(wrapper.vm.getOptionLabelWithHighlight("label")).toEqual(
      "l<strong>abe</strong>l"
    );
  });

  it("Should emit listMouseout on emitListMouseout call", async () => {
    await wrapper.vm.emitListMouseout();
    expect(wrapper.emitted()["listMouseout"]).toBeTruthy();
  });

  it("Should emit optionMouseover on emitOptionMouseover call", async () => {
    await wrapper.vm.emitOptionMouseover();
    expect(wrapper.emitted()["optionMouseover"]).toBeTruthy();
  });
});
