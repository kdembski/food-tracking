import { shallowMount } from "@vue/test-utils";
import CBottomBar from "./index.vue";

describe("Bottom Bar Component", () => {
  let wrapper: any;
  let bottomBarWrapper: any;

  beforeEach(async () => {
    wrapper = shallowMount(CBottomBar, {
      props: {
        items: [
          { route: "/recipes", label: "Przepisy", icon: "utensils" },
          { route: "/ordered", label: "Zamawiane?", icon: "box-open" },
          { route: "/", label: "Składniki", icon: "cheese" },
          { route: "/", label: "Kalendarz", icon: "calendar-days" },
          { route: "/", label: "Zakupy", icon: "list" },
          { route: "/", label: "Statystyki", icon: "chart-line" },
        ],
      },
      global: global.settings,
    });

    bottomBarWrapper = wrapper.find("bottom-bar__wrapper");
  });

  it("Should router link for each item", async () => {
    const routerLinks = wrapper.findAll("router-link-stub");
    expect(routerLinks.length).toEqual(6);
  });

  it("slideLeft should increment activeListIndex if lower or equal than listLimits length", async () => {
    expect(wrapper.vm.activeListIndex).toEqual(0);
    await wrapper.vm.slideLeft();
    expect(wrapper.vm.activeListIndex).toEqual(1);
    await wrapper.vm.slideLeft();
    expect(wrapper.vm.activeListIndex).toEqual(1);
  });

  it("slideRight should decrement activeListIndex if greater than 0", async () => {
    await wrapper.vm.slideLeft();
    expect(wrapper.vm.activeListIndex).toEqual(1);
    await wrapper.vm.slideRight();
    expect(wrapper.vm.activeListIndex).toEqual(0);
    await wrapper.vm.slideRight();
    expect(wrapper.vm.activeListIndex).toEqual(0);
  });
});
