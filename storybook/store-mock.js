import { createStore } from "vuex";

const list = {
  namespaced: true,
  state: {},
  getters: {
    getList: () => {
      return {
        data: [
          {
            1: "1-1",
            2: "1-2",
            3: "1-3",
            4: "1-4",
          },
          {
            1: "2-1",
            2: "2-2",
            3: "2-3",
            4: "2-4",
          },
          {
            1: "3-1",
            2: "3-2",
            3: "3-3",
            4: "3-4",
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

    getTags: () => "default,vege,ostre,szybkie,śniadanie,obiad,kolacja",
    isLoadingTags: () => false,
  },
  mutations: {},
  actions: {
    loadList: () => false,
    loadTags: () => false,
  },
};

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { list },
});
