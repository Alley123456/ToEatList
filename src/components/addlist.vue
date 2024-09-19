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
  const resData = await tips(state.value)
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

const querySearchAsync = debounce((queryString: string, cb: (results: any[]) => void) => {
  const data = UpdataSuggestions(); 
  data.then((result) => { 
    console.log(result);
    links.value = result; 
    cb(result); 
  }).catch((error) => { 
    console.error(error);
  });
  const results = queryString 
    ? links.value.filter(createFilter(queryString))
    : links.value;
  clearTimeout(timeout); 
  timeout = setTimeout(() => { 
    cb(results);
  }, 3000 * Math.random()); 
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
  state.value=''
}

</script>