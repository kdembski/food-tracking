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
export const Invalid = Template.bind({});
Invalid.args = Object.assign(
  { errorMessage: "Field is required" },
  Default.args
);
