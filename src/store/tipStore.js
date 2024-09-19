import { defineStore } from "pinia"
import {ref} from 'vue'

export const useTipsStore = defineStore('tips',()=>
{
    const tipsList=ref([])
    const addTips=(location,name,address)=>{
        tipsList.value.push({
            location,
            name,
            address
        })
    }
    const delTips=(index)=>{
        tipsList.value.splice(index,1)
    }

    return {
        tipsList,
        addTips,
        delTips
    }
}
)