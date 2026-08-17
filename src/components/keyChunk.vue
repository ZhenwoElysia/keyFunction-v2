<script setup lang="ts">
import type { keyConfig } from '../type/keyboards/keyboard';
import { usePhoneStore } from '../store/usePhoneStore';
import { storeToRefs } from 'pinia';


const phoneStore = usePhoneStore()
const { phoneConfig } = storeToRefs(phoneStore)

const temp = defineProps(['config'])
const config = temp.config as keyConfig
// console.log(config);


/*
config:
  id:number;
  keyCode:number;
  keyName:string
  enabled: boolean;
  triggerMethod:'click'|'hold';
  isTap:boolean;//是否按下
  text:string
  debounce:number|0//单位ms，默认0
  x: number;                // 左上角X相对坐标 (0~1)
  y: number;                // 左上角Y相对坐标 (0~1)
  width: number;            //相对父元素
  height: number;           //相对父元素
  //用户自定义颜色rgb
  keyBoxColor:[number,number,number]
  remark?: string;     // 可选：用户自定义备注
*/

</script>

<template>
  <div class="keyChunk" ref="keyChunk" :style="{
    position: `absolute`,
    left: `${config.x * 100}%`,
    top: `${config.y * 100}%`,
    width: `${config.width * phoneConfig.dx}px`,
    height: `${config.height * phoneConfig.dy}px`,
    backgroundColor: `rgb(${config.keyBoxColor})`,

  }">
    <div class="item">
      {{ config.remark }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
