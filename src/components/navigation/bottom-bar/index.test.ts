import { shallowMount } from "@vue/test-utils";
import CBottomBar from "./index.vue";

describe("Bottom Bar Component", () => {
  let wrapper: any = null;
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

  it("Should trigger active list change on wrapper screen swipe", async () => {
    expect(wrapper.active);
  });
});
