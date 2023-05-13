import CButton from "./index.vue";

export default {
  title: "controls/buttons/button",
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
        { size: "small", label: "Button" },
        { size: "medium", label: "Button" },
        { size: "large", label: "Button" },
        { size: "small", icon: "plus", label: "" },
        { size: "medium", icon: "plus", label: "" },
        { size: "large", icon: "plus", label: "" },
        { isDisabled: true, label: "Button" },
        { icon: "plus", label: "Button" },
        { isLoading: true, label: "Button" },
      ],
    };
  },
  template: `
    <div style="display: flex; gap: 20px">
      <div style="display: flex; flex-direction: column; gap: 20px">
        <div v-for="prop in props">
          <CButton v-bind="{...prop, ...args,}" />
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 20px">
        <div v-for="prop in props">
          <CButton v-bind="{...prop, ...args, variant: 'outlined'}" />
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 20px">
        <div v-for="prop in props">
          <CButton v-bind="{...prop, ...args, variant: 'text'}" />
        </div>
      </div>
    </div>
    `,
});

export const Primary = Template.bind({});

export const Secondary = Template.bind({});
Secondary.args = {
  color: "secondary",
};

export const Error = Template.bind({});
Error.args = {
  color: "error",
};
