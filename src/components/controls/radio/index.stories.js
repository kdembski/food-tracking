import CRadio from "./index.vue";

export default {
  title: "Controls/Radio",
  component: CRadio,
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { CRadio },
  data() {
    return {
      value: 1,
    };
  },
  template: `
    <CRadio v-bind="args" v-model="value" :value="1" id="test_id-1" name="name" style="margin-bottom: 10px"/>
    <CRadio v-bind="args" v-model="value" :value="2" id="test_id-2" name="name" />
  `,
});

export const Common = Template.bind({});
Common.args = {
  label: "Label",
};

export const Disabled = Template.bind({});
Disabled.args = Object.assign({ isDisabled: true }, Common.args);
