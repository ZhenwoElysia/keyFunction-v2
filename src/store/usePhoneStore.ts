import { defineStore } from "pinia";
import { ref } from 'vue'
import { defaultPhone } from "../type/phone/default";
import type { phoneConfig } from "../type/phone/phone";


export const usePhoneStore = defineStore('phone',()=>{
  const phoneConfig = ref<phoneConfig>(defaultPhone)


  const turnPhone=()=>{
  let temp: number
  temp = phoneConfig.value.dx
  phoneConfig.value.dx = phoneConfig.value.dy
  phoneConfig.value.dy = temp
  // console.log(phoneConfig.value.dx, phoneConfig.value.dy);
  }

  return {
    phoneConfig,
    turnPhone
  }
})