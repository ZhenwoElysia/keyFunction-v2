import { defineStore } from 'pinia'
import { ref } from 'vue'
import demoKeyConfig from '../type/keyboards/default'
import { addKeyInfo, keyConfig, keyConfigList } from '../type/keyboards/keyboard'
import {readAllData, saveAllData} from '../hook/dataOperation'
export const useKeyboardStore = defineStore('keyObj', () => {
  // 配置
  const keyConfigs = ref<keyConfig[]>(demoKeyConfig)
  
  // 删除key，接收id
  const subKey = (id: number) => {
    keyConfigs.value = keyConfigs.value.filter(key => key.id !== id)
    saveAllData()
  }
  //新加key
  const addKey=(addKeyInfo:addKeyInfo)=>{
    /*
      debounce:number|0//单位ms，默认0
      x: number;                // 左上角X相对坐标 (0~1)
      y: number;                // 左上角Y相对坐标 (0~1)
      width: number;            // 区域宽度相对比例 (0~1)
      height: number;           // 区域高度相对比例 (0~1)
    */
    //生成id
    let id = -1
    for (let i = 0; i < keyConfigs.value.length+1; i++) {
      if(keyConfigs.value.findIndex((ele)=>ele.id==i)==-1){
        id = i
      }
    }
    //生成随机颜色
    const  keyBoxColor:[number,number,number,] = [Math.floor(Math.random()*256),Math.floor(Math.random()*256),Math.floor(Math.random()*256)]
    //默认为true
    const  enabled = true
    const fanalAddKeyInfo:keyConfig = {
      id,
      ...addKeyInfo,
      keyBoxColor,
      enabled
    }
    keyConfigs.value.push(fanalAddKeyInfo)
    saveAllData()
  }

  const turnKey=()=>{
    for (let i = 0; i < keyConfigs.value.length; i++) {
      [keyConfigs.value[i].x,keyConfigs.value[i].y]=[keyConfigs.value[i].y,keyConfigs.value[i].x];
      [keyConfigs.value[i].width,keyConfigs.value[i].height]=[keyConfigs.value[i].height,keyConfigs.value[i].width]
    }
  }

  const saveKey=async ()=>{
    saveAllData()
  }

  const readKey = async ()=>{
    const {keyConfig}= await readAllData()
    keyConfigs.value = keyConfig
    return keyConfig
  }
  //重置
  const resetKey =()=>{

    keyConfigs.value = demoKeyConfig
  }
//初始化
  const initialize = async ():Promise<keyConfigList>=>{
    try {
      const initializeValue = await readKey()
      console.log('===key初始获取数据成功===');
      return initializeValue
    } catch (error) {
      console.log('====key初始获取数据失败，可能是未保存过数据，使用默认数据===');
      console.error(error)
      return demoKeyConfig
    }
  }
  initialize().then(res=>{
    console.log('===keyConfigs初始化成功===');
    keyConfigs.value=res
  })


  //修改(让用户自己删除新建即可)
  const editCertainKey=(_key:addKeyInfo)=>{
  }

  return {
    keyConfigs,
    subKey,
    addKey,
    turnKey,
    saveKey,
    readKey,
    resetKey,
    editCertainKey
  }
})