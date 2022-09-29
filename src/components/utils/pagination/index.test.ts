import { mount } from "@vue/test-utils";
import CPagination from "./index.vue";

describe("Pagination Component", () => {
  let wrapper: any = null;

  beforeEach(async () => {
    wrapper = mount(CPagination, {
      props: {
        paginationData: {},
        currentPage: 1,
        isLoading: false,
      },
      global: global.settings,
    });
  });

  it("Should render component", async () => {
    expect(wrapper.exists()).toBe(true);
  });
});
