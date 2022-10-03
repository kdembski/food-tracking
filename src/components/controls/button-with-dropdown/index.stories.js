import CButtonWithDropdown from "./index.vue";

export default {
  title: "Controls/Button With Dropdown",
  component: CButtonWithDropdown,
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { CButtonWithDropdown },
  template: `<CButtonWithDropdown v-bind="args" />`,
});

export const Default = Template.bind({});
Default.args = {
  options: [
    { value: 1, label: "Label-1" },
    { value: 2, label: "Label-2" },
    { value: 3, label: "Label-3" },
    { value: 4, label: "Label-4" },
    { value: 5, label: "Label-5" },
    { value: 6, label: "Label-6" },
  ],
  label: "Click to open",
};
