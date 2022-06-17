import CSlider from "./index.vue";

export default {
  title: "Controls/Slider",
  component: CSlider,
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  data() {
    return {
      value: 1,
    };
  },
  components: { CSlider },
  template: '<CSlider v-model="value" v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  options: [
    { value: 1, label: "Label-1" },
    { value: 2, label: "Label-2" },
    { value: 3, label: "Label-3" },
  ],
  id: "test_id",
};
