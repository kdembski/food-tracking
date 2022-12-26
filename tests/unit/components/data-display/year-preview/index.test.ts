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
      "M 0 40 C 1.8369701987210297e-16 37 -4 26 0 25 C 4 24 12 34 20 35 C 28 36 32 29.000000000000004 40 30 C 48 31 52 40 60 40 C 68 40 72 30 80 30 C 88 30 92 38 100 40 C 108 42 112 40 120 40 C 128 40 132 40 140 40 C 148 40 152 40 160 40 C 168 40 172 40 180 40 C 188 40 192 40 200 40 C 208 40 216 40 220 40"
    );
  });

  it("Should return chart height based on window width", async () => {
    expect(wrapper.vm.getChartHeight()).toEqual(40);
    window.innerWidth = 400;
    wrapper = mount(CYearPreview);
    expect(wrapper.vm.getChartHeight()).toEqual(90);
  });
});
