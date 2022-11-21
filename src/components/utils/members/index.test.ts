import { mount } from "@vue/test-utils";
import CMembers from "./index.vue";

describe("Members Component", () => {
  let wrapper: any = null;

  beforeEach(async () => {
    wrapper = mount(CMembers, {
      props: {
        members: [
          { id: 1, name: "test1" },
          { id: 2, name: "test2" },
        ],
      },
      global: global.settings,
    });
  });

  it("Should return uppercased first name letter on getItemLabel call", async () => {
    expect(wrapper.vm.getItemLabel({ id: 1, name: "test" })).toEqual("T");
  });

  it("Should return bg color on getItemBackgroundColor call", async () => {
    expect(wrapper.vm.getItemBackgroundColor({ id: 1, name: "test" })).toEqual(
      "#80d7e0"
    );
  });
});
