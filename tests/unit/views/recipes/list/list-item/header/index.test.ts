import { shallowMount } from "@vue/test-utils";
import RecipesListItemHeader from "@/views/recipes/list/list-item/header/index.vue";

describe("Recipes List Item Header", () => {
  let wrapper: any;

  beforeEach(async () => {
    wrapper = shallowMount(RecipesListItemHeader, {
      props: {
        item: {
          cookidooLink: "test",
        },
      },
      global: global.settings,
    });
  });

  it("Should emit addToCalendar event on addToCalendar call", async () => {
    await wrapper.vm.addToCalendar();
    expect(wrapper.emitted().addToCalendar).toBeTruthy();
  });

  it("Should get recipes list count on component mount", async () => {
    window.open = jest.fn();
    await wrapper.vm.openCookidoLink();
    expect(window.open).toHaveBeenCalledWith("test", "_blank");
  });

  it("Should push cookido link to mobile options if cookidoo link exists", async () => {
    expect(wrapper.vm.mobileDropdownOptions.length).toEqual(3);
    await wrapper.setProps({
      item: {},
    });
    expect(wrapper.vm.mobileDropdownOptions.length).toEqual(2);
  });
});
