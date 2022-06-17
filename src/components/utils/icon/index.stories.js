import CIcon from "./index.vue";

export default {
  title: "Utils/Icon",
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  data() {
    return {
      sizes: ["small", "medium", "large"],
    };
  },
  components: { CIcon },
  template:
    '<CIcon v-for="size in sizes" v-bind="args" :size="size" style="margin-bottom: 10px"> Content </CIcon>',
});

export const Success = Template.bind({});
Success.args = {
  type: "success",
};

export const Error = Template.bind({});
Error.args = {
  type: "error",
};
