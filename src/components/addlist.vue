<template>
  <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    placeholder="Please input"
    @select="handleSelect"
    @input="UpdataSuggestions"
  />

</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { tips } from '../api/tips'
const city=ref('')
const UpdataSuggestions = async ()=>{
  const resData = await tips(state.value,city)
  const newArray = resData.tips.map(item=>{
    return{value:item.name,address:item.district+item.address}
  })
  return newArray
}
const state = ref('')

interface LinkItem {
  value: string
  link: string
}

const links = ref<LinkItem[]>([])



let timeout: ReturnType<typeof setTimeout>
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  const data = UpdataSuggestions()
   data.then((result)=>{
    console.log(result)
    links.value=result
   }).catch((error)=>{
    console.error(error)
   })
  const results = queryString
    ? links.value.filter(createFilter(queryString))
    : links.value

  clearTimeout(timeout)
  timeout = setTimeout(() => {
    cb(results)
  }, 3000 * Math.random())
}
const createFilter = (queryString: string) => {
  return (restaurant: LinkItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}

const handleSelect = (item: Record<string, any>) => {
  console.log(item)
}

onMounted(() => {
   const data = UpdataSuggestions()
   data.then((result)=>{
    console.log(result)
    links.value=result
   }).catch((error)=>{
    console.error(error)
   })
   
})
</script>