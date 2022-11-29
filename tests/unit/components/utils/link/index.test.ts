import { mount } from "@vue/test-utils";
import CLink from "@/components/utils/link/index.vue";

describe("Link Component", () => {
  let wrapper: any;

  beforeEach(async () => {
    wrapper = mount(CLink, { global: global.settings });
  });

  it("Should render component", async () => {
    expect(wrapper.exists()).toBe(true);
  });
});
