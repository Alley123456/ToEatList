<template>
  <div class="demo-image">
      <el-image style="width: 550px; height: 550px" :src="imageUrl" :fit="fill" @click="Key"/>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useTipsStore } from '../store/tipStore';

const tipsStore = useTipsStore();
const labels = ref(tipsStore.tipsList);
const apiKey = import.meta.env.VITE_Key;
const baseUrl = `https://restapi.amap.com/v3/staticmap?zoom=10&size=600*600&location=104.067300,30.66224&key=${apiKey}`;
const url = new URL(baseUrl);
const imageUrl = ref(baseUrl);

// 监听labels的变化
watch(labels, (newLabels) => {
  updateLabels(newLabels);
}, { deep: true, immediate: true });

function updateLabels(newLabels:Array<{name:string;location:string}>):void {
  const params = new URLSearchParams(url.search);
  params.delete('labels'); // 先删除现有的labels参数

  let labelsString = '';
  newLabels.forEach((label:{name:string;location:string}) => {
    const newLabel = `${label.name.length>15?label.name.slice(0,15):label.name},2,0,16,0xFFFFFF,0x2288CB:${label.location}`;
    labelsString += (labelsString ? '|' : '') + newLabel;
    //
  });

  if (labelsString) {
    params.set('labels', labelsString);
  }

  url.search = params.toString();
  imageUrl.value = url.toString();
}
// 定义fill
const fill = ref('fill');
</script>