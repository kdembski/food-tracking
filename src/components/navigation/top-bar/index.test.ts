import { shallowMount } from "@vue/test-utils";
import CTopBar from "./index.vue";

describe("Top Bar Component", () => {
  let wrapper: any;

  beforeEach(async () => {
    wrapper = shallowMount(CTopBar, { global: global.settings });
  });

  it("Should render component", async () => {
    expect(wrapper.exists()).toBe(true);
  });
});
