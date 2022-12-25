import CTooltip from "./index.vue";

export default {
  title: "Feedback/Tooltip",
  component: CTooltip,
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { CTooltip },
  template: '<CTooltip v-bind="args"></CTooltip>',
});

export const Default = Template.bind({});
