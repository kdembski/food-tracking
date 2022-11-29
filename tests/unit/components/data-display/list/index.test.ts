import { mount } from "@vue/test-utils";
import CList from "@/components/data-display/list/index.vue";

describe("List Component", () => {
  let wrapper: any;

  beforeEach(async () => {
    wrapper = mount(CList, {
      props: { items: ["item1", "item2", "item3"] },
      global: global.settings,
    });
  });

  it("Should render list items", async () => {
    const items = wrapper.findAll("li.list__item");
    expect(items.length).toEqual(3);
  });

  it("Should show empty content when items length lower than 1", async () => {
    await wrapper.setProps({
      items: [],
    });
    expect(wrapper.find(".list__empty-content").exists()).toBe(true);
  });

  it("Should show list loader when isLoading is set to true", async () => {
    await wrapper.setProps({
      isLoading: true,
    });
    expect(wrapper.find(".list-loader").exists()).toBe(true);
  });
});
