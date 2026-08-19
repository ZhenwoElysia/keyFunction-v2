<script setup lang="ts">
import phone from '../phone/phone.vue';
import addKeyForm from '../../components/addKeyForm.vue';
import { ref } from 'vue'
import { useKeyboardStore } from '../../store/useKeyboardStore';
import type { keyConfig } from '../../type/keyboards/keyboard';
import { storeToRefs } from 'pinia';
import { usePhoneStore } from '../../store/usePhoneStore.ts';


const keyboardStore = useKeyboardStore()
let { keyConfigs } = storeToRefs(keyboardStore)
const { subKey, saveKey, resetKey, editCertainKey } = keyboardStore
const phoneStore = usePhoneStore()
const { resetPhone } = phoneStore

const pushingKey = ref(false)

// 详情面板控制
const currentKeyConfig = ref<keyConfig | null>(null)
const showInfo = (item: keyConfig) => {
  currentKeyConfig.value = item
}

const handleDelete = (id: number) => {
  subKey(id)
  currentKeyConfig.value = null
  keyConfigs.value = keyboardStore.keyConfigs
}

const saveKeyData = async () => {

  try {
    saveKey()
  } catch (error) {
  }

}

const haldleEditKey = (certainKey: keyConfig) => {
  alert('该功能还在维护，请直接删除按键并重新添加按键完成功能即可')
  editCertainKey(certainKey)
}

const handleReset = () => {
  alert(`重置:
      为避免误操作，重置并不会同时保存，如需保存，请手动保存`)
  resetKey()
  resetPhone()
}
</script>

<template>
  <div class="settingPage">
    <div class="configSettings">
      <!-- 可滚动内容区域：表格+详情面板 -->
      <div class="scroll-wrap">
        <table class="table">
          <tr>
            <td>keyCount</td>
            <td>{{ keyConfigs.length }}</td>
          </tr>
          <tr>
            <td>keys</td>
            <td>{{keyConfigs.map(e => e.keyName).join('、')}}</td>
          </tr>
          <tr @click="pushingKey = true">
            <td>添加key</td>
            <td>
              <div class="sigleBtn">+</div>
            </td>
          </tr>
          <tr v-for="item in keyConfigs" :key="item.id" @click="showInfo(item)">
            <td>{{ item.keyName }}</td>
            <td>点击查看具体信息</td>
          </tr>
        </table>

        <!-- 详情面板：表格下方、configSettings 内部 -->
        <div class="detail-panel" v-if="currentKeyConfig">
          <table class="detail-table">
            <tr>
              <td>ID</td>
              <td>{{ currentKeyConfig.id }}</td>
            </tr>
            <tr>
              <td>按键名称</td>
              <td>{{ currentKeyConfig.keyName }}</td>
            </tr>
            <tr>
              <td>按键编码</td>
              <td>{{ currentKeyConfig.keyCode }}</td>
            </tr>
            <tr>
              <td>是否启用</td>
              <td>{{ currentKeyConfig.enabled ? '启用' : '禁用' }}</td>
            </tr>
            <tr>
              <td>防抖时长</td>
              <td>{{ currentKeyConfig.debounce }} ms</td>
            </tr>
            <tr>
              <td>X 坐标比例</td>
              <td>{{ currentKeyConfig.x }}</td>
            </tr>
            <tr>
              <td>Y 坐标比例</td>
              <td>{{ currentKeyConfig.y }}</td>
            </tr>
            <tr>
              <td>宽度比例</td>
              <td>{{ currentKeyConfig.width }}</td>
            </tr>
            <tr>
              <td>高度比例</td>
              <td>{{ currentKeyConfig.height }}</td>
            </tr>
            <tr v-if="currentKeyConfig.remark">
              <td>备注</td>
              <td>{{ currentKeyConfig.remark }}</td>
            </tr>
            <tr>
              <td @click="handleDelete(currentKeyConfig.id)" class="deleteKey">删除</td>
              <td @click="haldleEditKey(currentKeyConfig)" class="changeKey">修改</td>
            </tr>
          </table>
        </div>
      </div>

      <!-- 按钮，重置与保存，固定在configSettings可视区域最底下 -->
      <div class="bottomBtn">
        <div @click="handleReset">重置</div>
        <div @click="saveKeyData">保存</div>
      </div>
    </div>
    <div class="operationArea">
      <phone></phone>
    </div>
  </div>
  <addKeyForm v-if="pushingKey" @close="pushingKey = false"></addKeyForm>
</template>

<style lang="scss" scoped>
.configSettings {
  position: fixed;
  left: 0;
  top: 40px;
  width: 30%;
  height: calc(100vh - 40px);
  padding: 16px;
  box-sizing: border-box;
  border-top: 1px solid rgb(255, 0, 255);
  border-right: 1px solid rgb(255, 0, 255);

  /* 弹性垂直布局 */
  display: flex;
  flex-direction: column;
  gap: 12px;

  /* 把overflow移到内层滚动容器，外层不要overflow */
  overflow: hidden;

  .scroll-wrap {
    flex: 1;
    overflow-y: auto;
  }
}

.table {
  width: 100%;
  border-collapse: collapse;

  tr {
    &:nth-child(odd) {
      background-color: rgba(230, 244, 252, 0.5);
    }

    &:nth-child(even) {
      background-color: rgb(252, 232, 242);
    }
  }

  td {
    text-align: center;
    padding: 8px 12px;
    border: 1px solid rgb(216, 200, 216);
    max-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    .sigleBtn {
      width: 24px;
      height: 24px;
      line-height: 24px;
      margin: 0 auto;
      border-radius: 4px;
      cursor: pointer;
      background: #fff;
    }

    .sigleBtn:hover {
      background-color: rgb(252, 232, 242);
    }
  }
}

/* 详情面板 */
.detail-panel {
  margin-top: 16px;
}

.detail-table {
  width: 100%;
  border-collapse: collapse;

  tr {
    &:nth-child(odd) {
      background-color: rgba(230, 244, 252, 0.5);
    }

    &:nth-child(even) {
      background-color: rgb(252, 232, 242);
    }
  }

  td {
    padding: 6px 10px;
    border: 1px solid rgb(216, 200, 216);
    text-align: center;

    &:first-child {
      width: 40%;
      color: #666;
      font-size: 14px;
    }

    &.deleteKey {
      color: white;
      background-color: rgb(254, 103, 103)
    }

    &.changeKey {
      background-color: rgb(236, 211, 24)
    }
  }
}

/*底部按钮区域*/
.bottomBtn {
  display: flex;
  gap: 10px;
  flex-shrink: 0;

  /*禁止被压缩*/
  >div {
    flex: 1;
    text-align: center;
    padding: 8px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    background: #fff;
  }

  >div:hover {
    background: #eee;
  }
}

.operationArea {
  position: relative;
  margin-left: 30%;
  height: calc(100vh - 40px);
}
</style>