import {defineStore} from 'pinia'

export const useStoreDemo = defineStore('storeDemo',{
    state: ()=>{
        return {
            msg: "hello pinia"
        }
    },
    getters:{},
    // mutations:{},
    actions:{
        //接受参数
        changeStoreDemo(value){
            this.msg = value
        }
    }


})