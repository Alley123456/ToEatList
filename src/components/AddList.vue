<template>
  <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    placeholder="Please input"
    value-key="name"
    @select="handleSelect"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getInputTips } from "../api/tips";
import { Position, useTipsStore } from "../store/tipStore";

const TipsStore = useTipsStore();

// 获取搜索建议
const updateSuggestions = async (keywords: string): Promise<Position[]> => {
  const { tips } = await getInputTips({ keywords });

  return tips.map(({ name, location, district, address }) => ({
    address: district + address,
    location,
    name,
  }));
};
const state = ref("");

const querySearchAsync = (
  queryString: string,
  cb: (results: any[]) => void
) => {
  updateSuggestions(queryString)
    .then((result) => cb(result))
    .catch(console.error);
};

const handleSelect = (item: Position) => {
  TipsStore.addTips(item);
  state.value = "";
};
</script>
