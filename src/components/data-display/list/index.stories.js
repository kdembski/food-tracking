import CList from "./index.vue";

export default {
  title: "Data Display/List",
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { CList },
  template: '<CList v-bind="args"></CList>',
});

export const Default = Template.bind({});

Default.args = {
  items: [
    {
      1: "1-1",
      2: "1-2",
      3: "1-3",
      4: "1-4",
    },
    {
      1: "2-1",
      2: "2-2",
      3: "2-3",
      4: "2-4",
    },
    {
      1: "3-1",
      2: "3-2",
      3: "3-3",
      4: "3-4",
    },
  ],
  columns: [
    {
      label: "label-1",
      value: "1",
    },
    {
      label: "label-2",
      value: "2",
    },
    {
      label: "label-3",
      value: "3",
    },
    {
      label: "label-4",
      value: "4",
    },
  ],
};
