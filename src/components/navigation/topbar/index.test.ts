import { shallowMount } from "@vue/test-utils";
import CTopbar from "./index.vue";

describe("Topbar Component", () => {
  let wrapper: any = null;

  beforeEach(async () => {
    wrapper = shallowMount(CTopbar, { global: global.settings });
  });

  it("Should render component", async () => {
    expect(wrapper.exists()).toBe(true);
  });
});
