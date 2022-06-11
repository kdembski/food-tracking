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
    '<CListWithFilters v-bind="args" style="height: 90vh"></CListWithFilters>',
});

export const Default = Template.bind({});
Default.args = {
  columns: [
    {
      label: "label-1",
      value: "1",
      sortable: true,
    },
    {
      label: "label-2",
      value: "2",
    },
    {
      label: "label-3",
      value: "3",
    },
    {
      label: "label-4",
      value: "4",
    },
  ],
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
