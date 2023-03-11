import CSelectTags from "./index.vue";

export default {
  title: "Controls/Select Tags/Pills",
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
    '<div style="display:flex; flex-direction:column; gap:10px"><CSelectTags v-bind="args" v-model:selectedTags="selected" ></CSelectTags></div>',
});

export const Common = Template.bind({});
Common.args = {
  tags: [
    {
      name: "default",
      count: 12,
    },
    {
      name: "vege",
      count: 23,
    },
    {
      name: "ostre",
    },
    {
      name: "szybkie",
    },
    {
      name: "śniadanie",
    },
    {
      name: "obiad",
    },
    {
      name: "kolacja",
    },
  ],
};

export const isLoading = Template.bind({});
isLoading.args = Object.assign({ isLoading: true }, Common.args);

export const Empty = Template.bind({});
Empty.args = {
  tags: [],
};

export const withCounts = Template.bind({});
withCounts.args = Object.assign({ withCounts: true }, Common.args);
