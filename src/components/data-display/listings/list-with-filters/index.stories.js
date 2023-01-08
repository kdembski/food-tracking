import CListWithFilters from "./index.vue";

export default {
  title: "Data Display/List With Filters",
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { CListWithFilters },
  template: `
    <CListWithFilters v-bind="args" style="height: 90vh">
      <template v-slot:header="{ item }">
        <div style="padding: 10px">
          {{ item.name + ' header' }}
        </div>
      </template>
      <template v-slot:body="{ item }">
      <div style="padding: 10px">
        {{ item.name + ' body' }}
      </div>
    </template>
    </CListWithFilters>`,
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
  storeModuleName: "list",
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
