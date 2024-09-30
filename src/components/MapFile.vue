<template>
  <div class="demo-image">
    <el-image style="width: 550px; height: 550px" :src="imageUrl" fit="fill" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { Position, useTipsStore } from "../store/tipStore";

const tipsStore = useTipsStore();
const { tipsList: labels } = storeToRefs(tipsStore);

const API_KEY = import.meta.env.VITE_KEY;
const BASE_URL = "https://restapi.amap.com/v3/staticmap";
const DEFAULT_CONFIG = {
  zoom: "10",
  size: "600*600",
  location: "104.067300,30.66224",
};

const imageUrl = ref(generateImageUrl(DEFAULT_CONFIG.location));

function generateImageUrl(location: string, labelsString: string = ""): string {
  const { zoom, size } = DEFAULT_CONFIG;
  const params = new URLSearchParams({ location, zoom, size, key: API_KEY });

  if (labelsString) params.set("labels", labelsString);

  return `${BASE_URL}?${params.toString()}`;
}

function formatLabels(labels: Position[]): string {
  return labels
    .map((label) => {
      const name =
        label.name.length > 15 ? label.name.slice(0, 15) : label.name;
      return `${name},2,0,16,0xFFFFFF,0x2288CB:${label.location}`;
    })
    .join("|");
}

function updateLabels(newLabels: Position[]): void {
  const labelsString = formatLabels(newLabels);
  imageUrl.value = generateImageUrl(DEFAULT_CONFIG.location, labelsString);
}

watch(
  labels,
  (newLabels) => {
    updateLabels(newLabels);
  },
  { deep: true, immediate: true }
);

onMounted(() => {
  updateLabels(labels.value);
});
</script>
