import { shallowMount } from "@vue/test-utils";
import CMobileSidebar from "./index.vue";

describe("Mobile Sidebar Component", () => {
  let wrapper: any = null;

  beforeEach(async () => {
    wrapper = shallowMount(CMobileSidebar, {
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
  });

  it("Should router link for each item", async () => {
    const routerLinks = wrapper.findAll("router-link-stub");
    expect(routerLinks.length).toEqual(6);
  });
});
