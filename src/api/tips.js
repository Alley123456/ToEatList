import request from '../utils/http.js'

export const tips =(keywords)=>{
    return request({
        url:'/v3/assistant/inputtips',
        params:{
            keywords,
            city:'成都',
            datatype:'poi',
            key:import.meta.env.VITE_Key
        }
    })
}