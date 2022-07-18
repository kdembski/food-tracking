import CDropdown from "./index.vue";

export default {
  title: "Utils/Dropdown",
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { CDropdown },
  template:
    '<div style="position: relative"><CDropdown v-bind="args"></CDropdown></div>',
});

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  options: [
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

export const isLoading = Template.bind({});
isLoading.args = Object.assign({ isLoading: true }, Default.args);
