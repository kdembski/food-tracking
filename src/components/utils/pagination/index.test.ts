import { mount } from "@vue/test-utils";
import CPagination from "./index.vue";

describe("Pagination Component", () => {
  let wrapper: any = null;

  beforeEach(async () => {
    wrapper = mount(CPagination, { global: global.settings });
  });

  it("Should render component", async () => {
    expect(wrapper.exists()).toBe(true);
  });
});
