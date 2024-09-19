import request from '../utils/http.js'

export const tips =(keywords)=>{
    return request({
        url:'/v3/assistant/inputtips',
        params:{
            keywords,
            city:'成都',
            datatype:'poi',
            key:'0adbaa0473264eb02b9a12643e6c82f8'
        }
    })
}