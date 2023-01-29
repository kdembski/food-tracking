import CSetPortions from "./index.vue";

export default {
  title: "Controls/Set Portions",
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  data() {
    return {
      value: 0,
    };
  },
  components: { CSetPortions },
  template: '<CSetPortions v-bind="args" v-model="value"></CSetPortions>',
});

export const Default = Template.bind({});
Default.args = {};
