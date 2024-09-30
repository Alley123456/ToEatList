import { defineStore } from "pinia";
import { ref } from "vue";

export interface Position {
  location: string;
  name: string;
  address: string;
}

export const useTipsStore = defineStore(
  "tips",
  () => {
    const tipsList = ref<Position[]>([]);
    
    const addTips = (item: Position) => tipsList.value.push(item);
    const deleteTips = (index: number) => tipsList.value.splice(index, 1);

    return { tipsList, addTips, deleteTips };
  },
  {
    // 添加持久化配置
    persist: {
      key: "tipsStore",
      storage: localStorage,
    },
  }
);
