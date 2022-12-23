import { mount } from "@vue/test-utils";
import CYearPreview from "@/components/data-display/year-preview/index.vue";

describe("Year Preview Component", () => {
  let wrapper: any;

  beforeEach(async () => {
    wrapper = mount(CYearPreview, {
      props: {
        months: [
          [new Date(2000, 1, 1), new Date(2000, 1, 2), new Date(2000, 1, 3)],
          [new Date(2000, 1, 1)],
          [new Date(2000, 1, 1), new Date(2000, 1, 2)],
          [],
          [new Date(2000, 1, 1), new Date(2000, 1, 2)],
          [],
          [],
          [],
          [],
          [],
          [],
        ],
      },
      global: global.settings,
    });

    jest.useFakeTimers().setSystemTime(new Date(2000, 1, 2));
  });

  it("Should return month shortcuts from last year", async () => {
    expect(wrapper.vm.getMonthsShortcuts()).toEqual([
      "mar",
      "kwi",
      "maj",
      "cze",
      "lip",
      "sie",
      "wrz",
      "paź",
      "lis",
      "gru",
      "sty",
      "lut",
    ]);
  });

  it("Should get chart path based on provided dates", async () => {
    expect(wrapper.vm.getPath()).toEqual(
      "M 0 50 C 1.3777276490407724e-16 47.75 -3 35.75 0 35 C 3 34.25 14 44.25 20 45 C 26 45.75 34 39.25 40 40 C 46 40.75 54 50 60 50 C 66 50 74 40 80 40 C 86 40 94 48.5 100 50 C 106 51.5 114 50 120 50 C 126 50 134 50 140 50 C 146 50 154 50 160 50 C 166 50 174 50 180 50 C 186 50 194 50 200 50 C 206 50 217 50 220 50"
    );
  });

  it("Should return chart height based on window width", async () => {
    expect(wrapper.vm.getChartHeight()).toEqual(50);
    window.innerWidth = 400;
    wrapper = mount(CYearPreview);
    expect(wrapper.vm.getChartHeight()).toEqual(90);
  });
});
