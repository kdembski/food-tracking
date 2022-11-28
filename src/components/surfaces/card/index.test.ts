import { mount } from "@vue/test-utils";
import CCard from "./index.vue";

describe("Card Component", () => {
  let wrapper: any;

  beforeEach(async () => {
    wrapper = mount(CCard, { global: global.settings });
  });

  it("Should render component", async () => {
    expect(wrapper.exists()).toBe(true);
  });
});
