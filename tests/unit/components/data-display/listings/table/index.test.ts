import { mount } from "@vue/test-utils";
import CTable from "@/components/data-display/listings/table/index.vue";

describe("Table Component", () => {
  let wrapper: any;

  beforeEach(async () => {
    wrapper = mount(CTable, {
      props: {
        items: [
          {
            1: "1-1",
            2: "1-2",
            3: "1-3",
          },
          {
            1: "2-1",
            2: "2-2",
            3: "2-3",
          },
          {
            1: "3-1",
            2: "3-2",
            3: "3-3",
          },
        ],
        columns: [
          {
            label: "label-1",
            value: "1",
            sortable: true,
          },
          {
            label: "label-2",
            value: "2",
            getItemColumnValue: (value: any) => "formatted " + value,
          },
          {
            label: "label-3",
            value: "3",
          },
        ],
      },
      global: global.settings,
    });
  });

  it("Should render table items", async () => {
    const items = wrapper.find("tbody").findAll("tr");
    expect(items.length).toEqual(3);
  });

  it("Should show empty content when items length lower than 1", async () => {
    await wrapper.setProps({
      items: [],
    });
    expect(wrapper.find(".table__empty-content").exists()).toBe(true);
  });

  it("Should show table loader when isLoading is set to true", async () => {
    await wrapper.setProps({
      isLoading: true,
    });
    expect(wrapper.find(".table-loader").exists()).toBe(true);
  });

  it("Should format column value if getItemColumnValue is provided", async () => {
    expect(
      wrapper.vm.getItemColumnValue(wrapper.vm.columns[1], wrapper.vm.items[1])
    ).toEqual("formatted 2-2");
  });
});
