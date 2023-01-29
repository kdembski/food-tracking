import { createStore } from "vuex";

const list = {
  namespaced: true,
  state: {},
  getters: {
    list: () => {
      return {
        data: [
          {
            name: "item-1",
            1: "1-1",
            2: "1-2",
            3: "1-3",
            4: "1-4",
          },
          {
            name: "item-2",
            1: "2-1",
            2: "2-2",
            3: "2-3",
            4: "2-4",
          },
          {
            name: "item-3",
            1: "3-1",
            2: "3-2",
            3: "3-3",
            4: "3-4",
          },
          {
            name: "item-4",
            1: "4-1",
            2: "4-2",
            3: "4-3",
            4: "4-4",
          },
        ],
        pagination: {
          currentPage: 1,
          totalPages: 5,
          firstRecord: 1,
          lastRecord: 4,
          totalRecords: 4,
        },
      };
    },
    isLoadingList: () => false,

    tags: () => [
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
    all: [
      { id: 1, name: "Karol" },
      { id: 2, name: "Roksana" },
    ],
  },
};

export default createStore({
  state: { isTooltipOpen: true, tooltipConfig: { text: "Text" } },
  getters: {},
  mutations: {},
  actions: {},
  modules: { list, member },
});
