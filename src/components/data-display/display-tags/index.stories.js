import CDisplayTags from "./index.vue";

export default {
  title: "Data Display/Display Tags",
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { CDisplayTags },
  template: '<CDisplayTags v-bind="args"></CDisplayTags>',
});

export const Default = Template.bind({});
Default.args = {
  tags: "default,vege,ostre,szybkie,śniadanie,obiad,kolacja",
};
