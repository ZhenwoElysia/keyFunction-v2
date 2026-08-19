import { storeToRefs } from "pinia";
import { useKeyboardStore } from "../store/useKeyboardStore";
import { usePhoneStore } from "../store/usePhoneStore";
import type { configs } from "../type/type";

export const saveAllData = async ():Promise<void>=>{
  const keyboardStore = useKeyboardStore()
  const phoneStore = usePhoneStore()
  const {keyConfigs} = storeToRefs(keyboardStore)
  const {phoneConfig}=storeToRefs(phoneStore)
  const configs:configs = {
    keyConfig:keyConfigs.value,
    phoneConfig:phoneConfig.value,
  }

  const configJsonStr = JSON.stringify(configs)
  
  try {
    await window.fileApi.saveData(configJsonStr)
    console.log('===数据存储成功===');
    
  } catch (error) {
    console.error(error);
    
  }
}

export const readAllData = async ():Promise<configs>=>{
  try {
    const re =  await window.fileApi.readData()
    console.log('====全部数据读取成功====');
    return re
  } catch (error) {
    console.error(error);
  }
  throw new Error('====读取失败====')
}