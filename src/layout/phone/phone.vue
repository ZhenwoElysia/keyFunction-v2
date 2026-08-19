<script setup lang="ts">
import { ref } from 'vue';
import { useKeyboardStore } from '../../store/useKeyboardStore.ts';
import { usePhoneStore } from '../../store/usePhoneStore.ts';
import keyChunk from '../../components/keyChunk.vue';
import { storeToRefs } from 'pinia';
import { readAllData, saveAllData } from '../../hook/dataOperation.ts';


const keyboardStore = useKeyboardStore()
const { keyConfigs } = storeToRefs(keyboardStore)
const { turnKey } = keyboardStore

const phoneStore = usePhoneStore()
const { phoneConfig } = storeToRefs(phoneStore)
const { turnPhone } = phoneStore

const isShowMenu = ref(false)

//获取元素
let menuX = ref(0)
let menuY = ref(0)

const handleRightClick = (e: MouseEvent) => {
  e.preventDefault()
  if (e.target !== e.currentTarget)
    return
  //原位置点击，不改变
  if (menuX.value == e.clientX && menuY.value == e.clientY) {
    return
  }
  //不同位置点击
  if (menuX.value != e.clientX && menuY.value != e.clientY) {
    menuX.value = e.clientX;
    menuY.value = e.clientY;
    if (isShowMenu.value == true) {
      return
    }
  }
  isShowMenu.value = !isShowMenu.value
}

const handleLeftClick = () => {
  isShowMenu.value = false
}
const handleClick_turn = () => {
  turnKey()
  turnPhone()
  // 关闭菜单

  isShowMenu.value = false
}
</script>

<template>
  <div class="phoneBox" ref="phoneBox" @contextmenu="handleRightClick" @click="handleLeftClick" :style="{
    position: 'absolute',
    left: `${phoneConfig.phonePosX * 100}%`,
    top: `${phoneConfig.phonePosY * 100}%`,
    width: `${phoneConfig.dx}px`,
    height: `${phoneConfig.dy}px`,
    backgroundColor: `rgba(${phoneConfig.bgcColor})`
  }">
    <keyChunk v-for="keyConfig in keyConfigs" :keyId="keyConfig.id" :key="keyConfig.id"></keyChunk>
  </div>
  <div class="contextmenu" v-if="isShowMenu" :style="{ left: `${menuX}px`, top: `${menuY}px` }">
    <div class="menu-item" @click="handleClick_turn()">旋转</div>
    <div class="menu-item">test</div>
    <div class="menu-item" @click="isShowMenu = false">关闭</div>
  </div>
</template>

<style lang="scss" scoped>
.contextmenu {
  position: fixed;
  z-index: 1;
  width: 140px;
  background: rgba(175, 215, 255, 0.892); //菜单深色背景
  border-radius: 4px;
  padding: 4px 0;
  box-shadow: 0 2px 12px rgba(210, 145, 240, 0.25);

  .menu-item {
    padding: 6px 12px;
    background: rgb(252, 232, 242); //子项不同背景色
    margin: 2px 6px;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background: rgba(131, 193, 255, 0.953); //hover高亮
    }
  }
}
</style>
