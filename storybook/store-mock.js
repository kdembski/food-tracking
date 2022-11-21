import { createStore } from "vuex";

const list = {
  namespaced: true,
  state: {},
  getters: {
    getList: () => {
      return {
        data: [
          {
            name: "item-1",
          },
          {
            name: "item-2",
          },
          {
            name: "item-3",
          },
          {
            name: "item-4",
          },
        ],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          firstRecord: 1,
          lastRecord: 4,
          totalRecords: 4,
        },
      };
    },
    isLoadingList: () => false,

    getTags: () => [
      { name: "default" },
      { name: "vege" },
      { name: "ostre" },
      { name: "szybkie" },
      { name: "śniadanie" },
      { name: "obiad" },
      { name: "kolacja" },
    ],
    isLoadingTags: () => false,
  },
  mutations: {},
  actions: {
    loadList: () => false,
    loadTags: () => false,
  },
};

const member = {
  state: {
    members: [
      { id: 1, name: "Karol" },
      { id: 2, name: "Roksana" },
    ],
  },
};

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { list, member },
});
