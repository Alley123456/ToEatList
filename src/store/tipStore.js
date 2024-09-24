import { defineStore } from "pinia";
import { ref } from "vue";

export const useTipsStore = defineStore(
  "tips",
  () => {
    const tipsList = ref([]);

    const addTips = (item) => {
      tipsList.value.push({
        location: item.location,
        name: item.value,
        address: item.address,
      });
    };

    const delTips = (index) => {
      tipsList.value.splice(index, 1);
    };

    // 添加持久化配置
    return {
      tipsList,
      addTips,
      delTips,
    };
  },
  {
    persist: {
      key: "tips_store",
      storage: localStorage,
      paths: ["tipsList"],
    },
  },
);
