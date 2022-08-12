import { shallowMount } from "@vue/test-utils";
import CSidebar from "./index.vue";

describe("Sidebar Component", () => {
  it("Should render desktop sidebar", async () => {
    const wrapper = shallowMount(CSidebar, {
      props: { items: [] },
      global: global.settings,
    });
    const DesktopSidebar = wrapper.find("c-desktop-sidebar-stub");
    expect(DesktopSidebar.exists()).toBe(true);
  });

  it("Should render mobile sidebar", async () => {
    window.innerWidth = 500;
    const wrapper = shallowMount(CSidebar, {
      props: { items: [] },
      global: global.settings,
    });
    const DesktopSidebar = wrapper.find("c-mobile-sidebar-stub");
    expect(DesktopSidebar.exists()).toBe(true);
  });
});
