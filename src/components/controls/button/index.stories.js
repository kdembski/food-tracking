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
        { icon: "plus", label: "" },
        { isLoading: true },
      ],
    };
  },
  template: `
    <div v-for="prop in props" style="margin-bottom: 20px">
      <CButton v-bind="Object.assign(prop, args)" />
    </div>
    `,
});

export const Primary = Template.bind({});

export const PrimaryText = Template.bind({});
PrimaryText.args = Object.assign({ variant: "text" }, Primary.args);

export const Secondary = Template.bind({});
Secondary.args = {
  color: "secondary",
};

export const SecondaryText = Template.bind({});
SecondaryText.args = Object.assign({ variant: "text" }, Secondary.args);
