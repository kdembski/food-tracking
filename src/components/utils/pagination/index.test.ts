import { mount } from "@vue/test-utils";
import CPagination from "./index.vue";

describe("Pagination Component", () => {
  let wrapper: any = null;
  let arrowLeft: any;
  let arrowRight: any;
  let pages: any;

  const mountComponent = () => {
    wrapper = mount(CPagination, {
      props: {
        paginationData: {
          currentPage: 1,
          totalPages: 10,
          firstRecord: 1,
          lastRecord: 20,
          totalRecords: 50,
        },
        currentPage: 1,
        isLoading: false,
      },
      global: global.settings,
    });

    const arrows = wrapper.findAll(".pagination__arrow");
    pages = wrapper.findAll(".pagination-pages__item");
    arrowLeft = arrows[0];
    arrowRight = arrows[1];
  };

  beforeEach(async () => {
    mountComponent();
  });

  afterEach(() => {
    window.innerWidth = 1024;
  });

  it("Should show correct summary text", async () => {
    expect(wrapper.vm.getPaginationSummaryText()).toEqual(
      "Wyświetlono \xa0<strong>1</strong> - <strong>20</strong>\xa0\xa0z\xa0\xa0<strong>50</strong> \xa0wyników"
    );
  });

  it("Should show correct summary text on mobile", async () => {
    window.innerWidth = 400;
    mountComponent();
    expect(wrapper.vm.getPaginationSummaryText()).toEqual(
      "<strong>1</strong> - <strong>20</strong>\xa0\xa0z\xa0\xa0<strong>50</strong>"
    );
  });

  it("Should add active class to current page element", async () => {
    expect(pages[0].classes()).toContain("pagination-pages__item--active");
    expect(pages[1].classes()).not.toContain("pagination-pages__item--active");
  });

  it("Should disable left arrow if current page lower or equal to 1", async () => {
    expect(arrowLeft.classes()).toContain("pagination__arrow--disabled");
  });

  it("Should disable right arrow if current page greater or equal to total pages", async () => {
    await wrapper.setProps({
      currentPage: 10,
    });
    expect(arrowRight.classes()).toContain("pagination__arrow--disabled");
  });

  it("Should increment current page on right arrow click", async () => {
    expect(wrapper.vm.currentPage).toEqual(1);
    await arrowRight.trigger("click");
    expect(wrapper.emitted()["update:currentPage"][0][0]).toEqual(2);
  });

  it("Should not allow changing page to be greater than total pages", async () => {
    await wrapper.setProps({
      currentPage: 10,
    });
    await arrowRight.trigger("click");
    expect(wrapper.emitted()["update:currentPage"]).toBeFalsy();
  });

  it("Should decrement current page on left arrow click", async () => {
    await wrapper.setProps({
      currentPage: 3,
    });
    await arrowLeft.trigger("click");
    expect(wrapper.emitted()["update:currentPage"][0][0]).toEqual(2);
  });

  it("Should not allow changing page to be less or equal zero", async () => {
    expect(wrapper.vm.currentPage).toEqual(1);
    await arrowLeft.trigger("click");
    expect(wrapper.emitted()["update:currentPage"]).toBeFalsy();
  });
});
