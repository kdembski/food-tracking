import CMonthPreview from "./index.vue";
import { addDays, startOfMonth } from "date-fns";

export default {
  title: "Data Display/Month Preview",
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { CMonthPreview },
  template: '<CMonthPreview v-bind="args"></CMonthPreview>',
});

const firstDayOfMonth = startOfMonth(new Date());
export const Default = Template.bind({});
Default.args = {
  dates: [
    firstDayOfMonth,
    addDays(firstDayOfMonth, 2),
    addDays(firstDayOfMonth, 7),
    addDays(firstDayOfMonth, 11),
    addDays(firstDayOfMonth, 24),
    addDays(firstDayOfMonth, 27),
  ],
};
