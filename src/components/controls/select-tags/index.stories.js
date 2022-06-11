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
  tags: "default,vege,ostre,szybkie,śniadanie,obiad,kolacja",
};

export const isLoading = Template.bind({});
isLoading.args = Object.assign({ isLoading: true }, Default.args);

export const Empty = Template.bind({});
Empty.args = {
  tags: "",
};
