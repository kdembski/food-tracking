import { shallowMount } from "@vue/test-utils";
import RecipesListItemBody from "@/views/recipes/list/list-item/body/index.vue";

describe("Recipes List Item Body", () => {
  let wrapper: any;

  beforeEach(async () => {
    jest.useFakeTimers().setSystemTime(new Date(2000, 1, 1));

    wrapper = shallowMount(RecipesListItemBody, {
      props: {
        item: {
          cookedDatesInCurrentMonth: [
            new Date(2000, 1, 0),
            new Date(2000, 1, 2),
            new Date(2000, 1, 3),
          ],
          cookedDate: new Date(2000, 1, 1),
        },
      },
      global: global.settings,
    });
  });

  it("Should return on dates form future to plannedDates computed", async () => {
    expect(wrapper.vm.plannedDates).toEqual(["2 lut", "3 lut"]);
  });

  it("Should return formatted preparation time on getPreparationTime call", async () => {
    expect(wrapper.vm.getPreparationTime(40)).toEqual("40m");
    expect(wrapper.vm.getPreparationTime(60)).toEqual("1h");
    expect(wrapper.vm.getPreparationTime(80)).toEqual("1h 20m");
  });

  it("Should return formatted cooked date on getFormattedCookedDate", async () => {
    expect(wrapper.vm.getFormattedCookedDate(new Date(2000, 1, 1))).toEqual(
      "Dzisiaj"
    );
    expect(wrapper.vm.getFormattedCookedDate(new Date(2000, 1, 0))).toEqual(
      "Wczoraj"
    );
    expect(wrapper.vm.getFormattedCookedDate(new Date(2000, 1, 2))).toEqual(
      "Zaplanowane"
    );
    expect(wrapper.vm.getFormattedCookedDate(new Date(2000, 0, 0))).toEqual(
      "około miesiąc temu"
    );
    expect(
      wrapper.vm.getFormattedCookedDate(new Date(1970, 0, 1, 1, 0, 0))
    ).toEqual("Brak");
  });

  it("Should return cooked date tooltip content based on isPlanned value", async () => {
    expect(wrapper.vm.getCookedDateTooltipText()).toEqual(
      "Ostatnio gotowane dzisiaj"
    );

    await wrapper.vm.getFormattedCookedDate(new Date(2000, 1, 2));
    expect(wrapper.vm.getCookedDateTooltipText()).toEqual("Zaplanowane");
  });
});
