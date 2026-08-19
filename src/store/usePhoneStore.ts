import { defineStore } from "pinia";
import { ref } from 'vue'
import { defaultPhone } from "../type/phone/default";
import type { phoneConfig } from "../type/phone/phone";
import {readAllData, saveAllData} from "../hook/dataOperation";

export const usePhoneStore = defineStore('phone',()=>{

  const turnPhone=()=>{
    [phoneConfig.value.dx,phoneConfig.value.dy]=[phoneConfig.value.dy,phoneConfig.value.dx];
  }
  const saveData=()=>{
    saveAllData()
  }
  const readPhoneConfig =async()=>{
    const {phoneConfig:config} = await readAllData()
    phoneConfig.value = config
    return phoneConfig.value
  }

  //初始化
  let phoneConfig = ref<phoneConfig>(defaultPhone)
  const initialize =async():Promise<phoneConfig>=>{
     try {
      const initializeValue = await readPhoneConfig()
      console.log('===key初始获取数据成功===');
      return initializeValue
    } catch (error) {
      console.log('====key初始获取数据失败，可能是未保存过数据，使用默认数据===');
      return defaultPhone
    }
  }
  initialize().then(res=>{
    console.log('===phoneConfig初始化成功===');
    phoneConfig.value=res
  })

  const resetPhone = ()=>{
    phoneConfig.value = defaultPhone
  }

  return {
    phoneConfig,
    turnPhone,
    saveData,
    readPhoneConfig,
    resetPhone
  }

})