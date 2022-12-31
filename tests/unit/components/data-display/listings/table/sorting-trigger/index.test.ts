import { mount } from "@vue/test-utils";
import CSortingTrigger from "@/components/data-display/listings/table/sorting-trigger/index.vue";

describe("Sorting Trigger Component", () => {
  let wrapper: any;

  beforeEach(async () => {
    wrapper = mount(CSortingTrigger, {
      props: {
        column: {
          label: "label-1",
          value: "1",
        },
        currentSort: { sortAttribute: "1", sortDirection: "asc" },
      },
      global: global.settings,
    });
  });

  it("getActiveIconClass should return active class if current sort is matching column attribute and icon direction", async () => {
    expect(wrapper.vm.getActiveIconClass("asc")).toEqual(
      "sorting-trigger__icon--active"
    );
  });

  it("getActiveIconClass should return empty string if current sort is matching column attribute but not icon direction", async () => {
    expect(wrapper.vm.getActiveIconClass("desc")).toEqual("");
  });

  it("getActiveIconClass should return empty string if current sort is not matching attribute", async () => {
    await wrapper.setProps({
      currentSort: {
        sortAttribute: "2",
        sortDirection: "asc",
      },
    });
    expect(wrapper.vm.getActiveIconClass("asc")).toEqual("");
  });

  it("Should emit sortChange event with updated sort attribute and direction on sorting trigger click ", async () => {
    await wrapper.trigger("click");
    expect(wrapper.emitted().sortChange[0][0]).toStrictEqual({
      sortAttribute: "1",
      sortDirection: "desc",
    });

    await wrapper.setProps({
      currentSort: {
        sortAttribute: "1",
        sortDirection: "desc",
      },
    });
    await wrapper.trigger("click");
    expect(wrapper.emitted().sortChange[1][0]).toStrictEqual({
      sortAttribute: "1",
      sortDirection: "asc",
    });

    await wrapper.setProps({
      column: {
        label: "label-2",
        value: "2",
      },
    });
    await wrapper.trigger("click");
    expect(wrapper.emitted().sortChange[2][0]).toStrictEqual({
      sortAttribute: "2",
      sortDirection: "asc",
    });
  });
});
