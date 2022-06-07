import CSelectTags from "./index.vue";

export default {
  title: "Controls/Select Tags",
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  data() {
    return {
      selected: "",
    };
  },
  components: { CSelectTags },
  template:
    '<CSelectTags v-bind="args" v-model:selectedTags="selected"></CSelectTags>',
});

export const Default = Template.bind({});
Default.args = {
  tags: "default,vege,hot,szybki",
};
