import CCheckbox from "./index.vue";

export default {
  title: "Controls/Checkbox",
  component: CCheckbox,
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { CCheckbox },
  data() {
    return {
      value: false,
    };
  },
  template: `<CCheckbox v-bind="args" v-model="value" />`,
});

export const Common = Template.bind({});
Common.args = {
  label: "Label",
};

export const Disabled = Template.bind({});
Disabled.args = Object.assign({ isDisabled: true }, Common.args);
