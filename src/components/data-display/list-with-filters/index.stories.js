import CListWithFilters from "./index.vue";

export default {
  title: "Data Display/List With Filters",
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { CListWithFilters },
  template:
    '<CListWithFilters v-bind="args" style="height: 90vh"><template v-slot:default="{ item }"><div style="padding: 20px">{{ item[1] }}</div></template></CListWithFilters>',
});

export const Default = Template.bind({});
Default.args = {
  defaultFilters: {
    currentPage: 1,
    pageSize: 10,
    searchPhrase: "",
    sortAttribute: "1",
    sortDirection: "asc",
    tags: "",
  },
  listName: "list",
  listGetterName: "list/getList",
  listIsLoadingGetterName: "list/isLoadingList",
  listLoadActionName: "list/loadList",
  tagsGetterName: "list/getTags",
  tagsIsLoadingGetterName: "list/isLoadingTags",
  tagsLoadActionName: "list/loadTags",
};

export const isLoading = Template.bind({});
isLoading.args = Object.assign({ isLoading: true }, Default.args);

export const withoutTags = Template.bind({});
withoutTags.args = Object.assign({ enableTags: false }, Default.args);

export const isLoadingWithoutTags = Template.bind({});
isLoadingWithoutTags.args = Object.assign(
  { enableTags: false },
  isLoading.args
);
