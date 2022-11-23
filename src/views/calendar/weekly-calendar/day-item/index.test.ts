import { createStore } from "vuex";
import { shallowMount } from "@vue/test-utils";
import WeeklyCalendarDayItem from "./index.vue";

describe("Weekly Calendar Day Item", () => {
  let wrapper: any;
  let store: any;
  let state: any;
  const item = {
    id: 1,
    name: "name",
    members: [1, 2],
  };

  beforeEach(async () => {
    state = {
      tooltipConfig: {
        activeCustomContent: "test",
      },
    };

    store = createStore({
      state,
    });

    global.settings.provide = {
      store,
    };

    const tooltipContent = document.createElement("div");
    tooltipContent.id = "tooltip-content";
    document.body.appendChild(tooltipContent);

    wrapper = shallowMount(WeeklyCalendarDayItem, {
      props: {
        item,
      },
      global: global.settings,
    });
  });

  it("Should return item members length", async () => {
    expect(wrapper.vm.membersLength).toEqual(2);
  });

  it("Should return tags tooltip id", async () => {
    expect(wrapper.vm.getTagsTooltipId(1)).toEqual("calendar-tags-1");
  });

  it("Should show tooltip if active custom content is matching tooltip id", async () => {
    expect(wrapper.vm.isTagsTooltipContentVisible(1)).toBe(false);
    state.tooltipConfig.activeCustomContent = "calendar-tags-1";
    expect(wrapper.vm.isTagsTooltipContentVisible(1)).toBe(true);
  });

  it("Should set item heading based on item name and members", async () => {
    const heading = wrapper.find(".day-item__header > p");
    expect(heading.html()).toEqual("<p>name<strong>x2</strong></p>");
  });

  it("Should emit delete event with item id on delete button click", async () => {
    const deleteButton = wrapper.findAll("c-button-stub")[0];
    await deleteButton.trigger("click");
    expect(wrapper.emitted().delete[0][0]).toEqual(1);
  });

  it("Should emit clone event with item id on duplicate button click", async () => {
    const duplicateButton = wrapper.findAll("c-button-stub")[1];
    await duplicateButton.trigger("click");
    expect(wrapper.emitted().clone[0][0]).toEqual(item);
  });

  it("Should emit edit event with item id on edit button click", async () => {
    const editButton = wrapper.findAll("c-button-stub")[2];
    await editButton.trigger("click");
    expect(wrapper.emitted().edit[0][0]).toEqual(item);
  });
});
