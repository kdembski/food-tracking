import CButton from "./index.vue";

export default {
  title: "Controls/Button",
  component: CButton,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["text", "contained", "outlined"],
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "normal", "large"],
    },
  },
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { CButton },
  data() {
    return {
      props: [
        { size: "small" },
        { size: "medium" },
        { size: "large" },
        { isDisabled: true },
        { icon: "plus" },
        { isLoading: true },
      ],
    };
  },
  template:
    '<div v-for="prop in props" style="margin-bottom: 20px"><CButton v-bind="Object.assign(prop, args)" /></div>',
});

export const Primary = Template.bind({});
Primary.args = {
  label: "Button",
};

export const PrimaryOutlined = Template.bind({});
PrimaryOutlined.args = Object.assign({ variant: "outlined" }, Primary.args);

export const PrimaryText = Template.bind({});
PrimaryText.args = Object.assign({ variant: "text" }, Primary.args);

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Button",
  color: "secondary",
};

export const SecondaryOutlined = Template.bind({});
SecondaryOutlined.args = Object.assign({ variant: "outlined" }, Secondary.args);

export const SecondaryText = Template.bind({});
SecondaryText.args = Object.assign({ variant: "text" }, Secondary.args);
