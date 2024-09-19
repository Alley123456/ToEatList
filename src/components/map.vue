<template>
  <div class="demo-image">
      <el-image style="width: 600px; height: 600px" :src="imageUrl" :fit="fill" @click="Show"/>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useTipsStore } from '../store/tipStore';

const tipsStore = useTipsStore();
const labels = ref(tipsStore.tipsList);
const baseUrl = 'https://restapi.amap.com/v3/staticmap?zoom=10&size=600*600&location=104.067300,30.66224&key=0adbaa0473264eb02b9a12643e6c82f8';
const url = new URL(baseUrl);
const imageUrl = ref(baseUrl);

// 监听labels的变化
watch(labels, (newLabels) => {
  updateLabels(newLabels);
}, { deep: true, immediate: true });

// 定义更新labels的函数
function updateLabels(newLabels) {
  const params = new URLSearchParams(url.search);
  params.delete('labels'); // 先删除现有的labels参数

  // 添加新的labels参数return str.length > 15 ? str.slice(0, 15) : str;
  let labelsString = '';
  newLabels.forEach((label) => {
    const newLabel = `${label.name.length>15?label.name.slice(0,15):label.name},2,0,16,0xFFFFFF,0x2288CB:${label.location}`;
    labelsString += (labelsString ? '|' : '') + newLabel;
    //
  });

  // 设置新的labels参数
  if (labelsString) {
    params.set('labels', labelsString);
  }

  // 更新imageUrl
  url.search = params.toString();
  imageUrl.value = url.toString();
}

// 定义点击事件处理函数
const Show = () => {
  console.log(labels.value);
  console.log(imageUrl.value);
};

// 定义fill
const fill = ref('fill');
</script>