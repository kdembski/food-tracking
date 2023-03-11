import CSelectTags from "./index.vue";

export default {
  title: "Controls/Select Tags/Default",
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
    '<div style="display:flex; flex-direction:column; gap:20px"><CSelectTags v-bind="args" v-model:selectedTags="selected" ></CSelectTags></div>',
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
  enableAddingTags: true,
};

export const isLoading = Template.bind({});
isLoading.args = Object.assign({ isLoading: true }, Common.args);
