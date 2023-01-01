import CTableWithFilters from "./index.vue";

export default {
  title: "Data Display/Table With Filters",
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { CTableWithFilters },
  template:
    '<CTableWithFilters v-bind="args" style="height: 90vh"></CTableWithFilters>',
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
  listLoadingGetterName: "list/isLoadingList",
  listLoadActionName: "list/loadList",
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
};

export const isLoading = Template.bind({});
isLoading.args = Object.assign({ isLoading: true }, Default.args);
