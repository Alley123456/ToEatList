import { defineStore } from "pinia"
import {ref} from 'vue'

export const useTipsStore = defineStore('tips',()=>
{
    const tipsList=ref([])
    const addTips=(location,name,address)=>{
        tipsList.value.push({
            location,
            name,
            address,
            key:Date.now(),
            times:0,
            comment:''
        })
    }

    return {
        tipsList,
        addTips
    }
}
)