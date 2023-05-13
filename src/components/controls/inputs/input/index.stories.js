import CInput from "./index.vue";

export default {
  title: "controls/inputs/input",
  component: CInput,
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
  components: { CInput },
  template: '<CInput v-model="value" v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  label: "Label",
};

export const Invalid = Template.bind({});
Invalid.args = Object.assign(
  { errorMessage: "Field is required" },
  Default.args
);

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: "magnifying-glass",
};

export const InvalidWithIcon = Template.bind({});
InvalidWithIcon.args = Object.assign(
  { errorMessage: "Field is required" },
  WithIcon.args
);

export const isLoading = Template.bind({});
isLoading.args = Object.assign({ isLoading: true }, Default.args);

export const isSuccessful = Template.bind({});
isSuccessful.args = Object.assign({ isSuccessful: true }, Default.args);

export const isDisabled = Template.bind({});
isDisabled.args = Object.assign({ isDisabled: true }, Default.args);
