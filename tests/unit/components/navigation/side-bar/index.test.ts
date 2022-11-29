import { shallowMount } from "@vue/test-utils";
import CSideBar from "@/components/navigation/side-bar/index.vue";

describe("Side Bar Component", () => {
  let wrapper: any;

  beforeEach(async () => {
    wrapper = shallowMount(CSideBar, {
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
