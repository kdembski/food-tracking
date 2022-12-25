import CYearPreview from "./index.vue";

export default {
  title: "Data Display/Year Preview",
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { CYearPreview },
  template: '<CYearPreview v-bind="args"></CYearPreview>',
});

export const Default = Template.bind({});
Default.args = {
  months: [
    [],
    [],
    [
      new Date(2022, 9, 1),
      new Date(2022, 9, 1),
      new Date(2022, 9, 1),
      new Date(2022, 9, 1),
      new Date(2022, 9, 1),
    ],
    [new Date(2022, 9, 1), new Date(2022, 9, 1)],
    [new Date(2022, 9, 1), new Date(2022, 9, 1)],
    [new Date(2022, 9, 1), new Date(2022, 9, 1)],
    [new Date(2022, 9, 1)],
    [new Date(2022, 9, 1), new Date(2022, 9, 1)],
    [new Date(2022, 9, 1), new Date(2022, 9, 1)],
    [new Date(2022, 9, 1), new Date(2022, 9, 1)],
    [new Date(2022, 9, 1)],
    [new Date(2022, 9, 1)],
  ],
};
