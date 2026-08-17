import { defineStore } from 'pinia'
import { ref } from 'vue'
import demoKeyConfig from '../type/keyboards/default'
import { addKeyInfo, keyConfig } from '../type/keyboards/keyboard'
export const useKeyboardStore = defineStore('keyObj', () => {
  // 状态
  const keyConfigs = ref<keyConfig[]>(demoKeyConfig)



  // 删除key，接收id
  const subKey = (id: number) => {
    keyConfigs.value = keyConfigs.value.filter(item => item.id !== id)
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
    const  keyBoxColor:[number,number,number,] = [Math.random()*256,Math.random()*256,Math.random()*256]
    const  enabled = true

    const fanalAddKeyInfo:keyConfig = {
      id,
      ...addKeyInfo,
      keyBoxColor,
      enabled
    }

    keyConfigs.value.push(fanalAddKeyInfo)
  }

  const turnKey=()=>{
    for (let i = 0; i < keyConfigs.value.length; i++) {
      const keyConfig = keyConfigs.value[i];
      // console.log('===========');
      // console.log(i+':');
      // console.log(keyConfig.x,keyConfig.y);


      const temp1 = keyConfig.x
      keyConfig.x=keyConfig.y
      keyConfig.y=temp1

      const temp2 = keyConfig.width
      keyConfig.width = keyConfig.height
      keyConfig.height=temp2

    }
  }
  const saveKey=async ()=>{
    const fullPath = await window.fileOperation.getConfigFullPath('keyConfig.json')
    const jsonStr = JSON.stringify(keyConfigs.value,null,2)
    await window.fileOperation.writeFile(fullPath, jsonStr)
  }
  return {
    keyConfigs,
    subKey,
    addKey,
    turnKey,
    saveKey
  }
})