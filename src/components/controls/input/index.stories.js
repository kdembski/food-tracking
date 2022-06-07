import CInput from "./index.vue";

export default {
  title: "Controls/Input",
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
