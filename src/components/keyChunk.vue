<script setup lang="ts">
import editKeyForm from './editKeyForm.vue';
import type { keyConfig } from '../type/keyboards/keyboard';
import { usePhoneStore } from '../store/usePhoneStore';
import { useKeyboardStore } from '../store/useKeyboardStore';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';


const keyboardStore = useKeyboardStore()
const phoneStore = usePhoneStore()
const { phoneConfig } = storeToRefs(phoneStore)
const { keyConfigs } = storeToRefs(keyboardStore)
// const { editCertainKey } = keyboardStore

const keyChunk = ref<HTMLDivElement | null>(null)

const prop = defineProps({
  keyId: Number
})
const keyId = prop.keyId
const config = computed(() => {
  return keyConfigs.value.find(key => key.id == keyId) as keyConfig
})

const isEdit = ref(false)



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
const isShowMenu = ref(false)
const menuX = ref(0)
const menuY = ref(0)

const handleRightClick = (e: MouseEvent) => {
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

const closeMenu = () => [
  isShowMenu.value = false
]


const handleEditKey = () => {
  closeMenu()
  isEdit.value = true
}


const moveKeyChunk = (e: MouseEvent) => {
  const phoneDomRect = keyChunk.value?.parentElement?.getBoundingClientRect() as DOMRect
  const [boxX, boxY, boxDx, boxDy] = [phoneDomRect.left + window.scrollX, phoneDomRect.top + window.scrollY, phoneDomRect.width, phoneDomRect.height]
  const [cursorX, cursorY] = [e.pageX, e.pageY]
  //x,y是相对于盒子的坐标
  //鼠标+盒子宽度是否在盒子内，是：返回相对坐标，否：返回原坐标
  config.value.x =
    (cursorX <= boxX + boxDx - config.value.width * boxDx) &&
      (cursorX > boxX) ? (cursorX - boxX) / boxDx : config.value.x
  config.value.y = (cursorY <= boxY + boxDy - config.value.height * boxDy) &&
    (cursorY > boxY) ? (cursorY - boxY) / boxDy : config.value.y

}
const canRemove = ref(false)
const removeMoveEvent = () => {
  if (canRemove.value) {
    keyChunk.value?.parentElement?.parentElement?.removeEventListener('mousemove', moveKeyChunk)
    keyChunk.value?.parentElement?.parentElement?.removeEventListener('click', removeMoveEvent)
  }
  canRemove.value = !canRemove.value
}

const handleMove = () => {
  keyChunk.value?.parentElement?.parentElement?.addEventListener('mousemove', moveKeyChunk)
  console.log(canRemove.value);
  keyChunk.value?.parentElement?.parentElement?.addEventListener('click', removeMoveEvent)
  console.log(canRemove.value);
}
</script>

<template>
  <div class="keyChunk" ref="keyChunk" @contextmenu="handleRightClick" :style="{
    position: `absolute`,
    left: `${config.x * 100}%`,
    top: `${config.y * 100}%`,
    width: `${config.width * phoneConfig.dx}px`,
    height: `${config.height * phoneConfig.dy}px`,
    backgroundColor: `rgb(${config.keyBoxColor})`,

  }">
    <div class="remark" @contextmenu="handleRightClick">
      {{ config.remark }}
    </div>
  </div>
  <div class="contextmenu" v-if="isShowMenu" :style="{ left: `${menuX}px`, top: `${menuY}px` }">
    <div class="menu-item" @click="handleEditKey">编辑</div>
    <div class="menu-item" @click="handleMove">跟随鼠标移动(再次点击取消跟随)</div>
    <div class="menu-item" @click="closeMenu">关闭</div>
  </div>
  <editKeyForm v-if="isEdit" @close="isEdit = false" :key="config.id" :config="config"></editKeyForm>
</template>

<style lang="scss" scoped>
.remark {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

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
