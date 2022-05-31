import CInput from "./index.vue";

export default {
  title: "Controls/Input",
  component: CInput,
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { CInput },
  template: '<CInput v-bind="args" />',
});

export const Default = Template.bind({});
export const Invalid = Template.bind({});
Invalid.args = Object.assign(
  { errorMessage: "Field is required" },
  Default.args
);
