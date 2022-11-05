import CAutocomplete from "./index.vue";

export default {
  title: "Controls/Autocomplete",
  component: CAutocomplete,
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  data() {
    return {
      value: "",
    };
  },
  components: { CAutocomplete },
  template: '<CAutocomplete v-model="value" v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  label: "Label",
  options: [
    { value: 1, label: "Label-1" },
    { value: 2, label: "Label-2" },
    { value: 3, label: "Label-3" },
    { value: 4, label: "Label-4" },
    { value: 5, label: "Label-5" },
    { value: 6, label: "Label-6" },
  ],
};

export const Invalid = Template.bind({});
Invalid.args = Object.assign(
  { errorMessage: "Field is required" },
  Default.args
);

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: "magnifying-glass",
  options: Default.args.options,
};

export const InvalidWithIcon = Template.bind({});
InvalidWithIcon.args = Object.assign(
  { errorMessage: "Field is required" },
  WithIcon.args
);
