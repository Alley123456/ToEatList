<template>
  <el-autocomplete
    v-model="state"
    :fetch-suggestions="debounceQuerySearch"
    placeholder="Please input"
    @select="handleSelect"
  />

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { tips } from '../api/tips'
import { useTipsStore } from '../store/tipStore';
import {debounce} from '../utils/debounce'
const TipsStore = useTipsStore()
const city=ref('')
const UpdataSuggestions = async ()=>{
  const resData = await tips(state.value,city)
  console.log(resData.tips);
  resData.tips = resData.tips.map(item=>{
    return{value:item.name,address:item.district+item.address,location:item.location}
  })
  return resData.tips
}
const state = ref('')

interface LinkItem {
  value: string
  link: string
}

const links = ref<LinkItem[]>([])

let timeout: ReturnType<typeof setTimeout>
// 修改后的querySearchAsync函数，确保异步逻辑正确处理
const querySearchAsync = debounce((queryString: string, cb: (results: any[]) => void) => {
  const data = UpdataSuggestions(); // 调用异步函数获取数据
  data.then((result) => { // 处理Promise解析结果
    console.log(result);
    links.value = result; // 更新响应式数组
    cb(result); // 调用回调函数，传递搜索结果
  }).catch((error) => { // 处理Promise错误
    console.error(error);
  });
  const results = queryString // 根据用户输入过滤结果
    ? links.value.filter(createFilter(queryString))
    : links.value;
  clearTimeout(timeout); // 清除之前的setTimeout
  timeout = setTimeout(() => { // 设置新的延迟执行
    cb(results);
  }, 3000 * Math.random()); // 延迟时间使用随机数，可能不是最佳实践
}, 500);

const debounceQuerySearch = debounce(querySearchAsync,500)
const createFilter = (queryString: string) => {
  return (restaurant: LinkItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}

const handleSelect = (item: Record<string, any>) => {
  TipsStore.addTips(item.location,item.value,item.address)
  console.log(TipsStore.tipsList)
}
/* const handleInput = async () => {
  await UpdataSuggestions(); // 确保在输入时更新建议
} */
</script>