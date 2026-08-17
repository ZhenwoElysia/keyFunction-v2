<script setup lang="ts">
import { ref } from 'vue'
import { useKeyboardStore } from '../store/useKeyboardStore'
const keyboardStore = useKeyboardStore()
const addKey = keyboardStore.addKey
const emit = defineEmits(['close'])
const selfDestroy = () => {
  emit('close')
}

const cancelHandle = (e: MouseEvent) => {
  if (e.target === e.currentTarget)
    selfDestroy()
}

const verifyInput = (): boolean => {
  console.log(debounce, x, y, keyCode, keyName.value, isKeySetting);

  if (inputInfo.value.debounce < 0 ||
    inputInfo.value.x < 0 || inputInfo.value.x + inputInfo.value.width > 100 ||
    inputInfo.value.y < 0 || inputInfo.value.y + inputInfo.value.height > 100 ||
    inputInfo.value.width < 0 ||
    inputInfo.value.height < 0 ||
    inputInfo.value.keyName == 'null' ||
    isKeySetting == false
  )
    return false
  console.log(inputInfo.value);

  inputInfo.value.x = inputInfo.value.x > 1 ? inputInfo.value.x / 100 : inputInfo.value.x
  inputInfo.value.y = inputInfo.value.y > 1 ? inputInfo.value.y / 100 : inputInfo.value.y
  inputInfo.value.width = inputInfo.value.width > 1 ? inputInfo.value.width / 100 : inputInfo.value.width
  inputInfo.value.height = inputInfo.value.height > 1 ? inputInfo.value.height / 100 : inputInfo.value.height
  return true
}

const confirmAddHandle = () => {
  console.log(inputInfo.value);

  if (!verifyInput())
    return
  addKey(inputInfo.value)
  //最后关闭
  selfDestroy()
}

let isKeySetting = false
const getkeyValueByClick = (e: KeyboardEvent) => {
  inputInfo.value.keyCode = e.keyCode
  inputInfo.value.keyName = e.key
  isKeySetting = true
  console.log(keyName);

  window.removeEventListener('keydown', getkeyValueByClick)
}

const getClickKey = () => {
  window.addEventListener('keydown', getkeyValueByClick)
}


let keyCode = ref(-1)
let keyName = ref('null')
let debounce = ref(0)
let x = ref(-1)
let y = ref(-1)
let width = ref(-1)
let height = ref(-1)

const inputInfo = ref({
  keyCode: keyCode.value,
  keyName: keyName.value,
  debounce: debounce.value,
  x: x.value,
  y: y.value,
  width: width.value,
  height: height.value,
})
</script>

<template>
  <!-- 遮罩层 -->
  <div class="modal-mask" @click="cancelHandle">
    <!--弹窗主体-->
    <div class="modal-wrap">
      <div class="modal-header">
        <span>新增按键配置</span>
        <div class="close-btn" @click="cancelHandle">×</div>
      </div>
      <div class="modal-body">
        <div class="form-item getKey" @click="getClickKey">
          {{ inputInfo.keyName == 'null' ? '确认按键' : inputInfo.keyName }}
        </div>
        <div class="form-item">
          <label>防抖时长(ms)</label>
          <input type="number" placeholder="0" v-model="inputInfo.debounce">
        </div>
        <div class="form-item">
          <label>X坐标比例</label>
          <input type="number" step="0.01" placeholder="0‑1" v-model="inputInfo.x">
        </div>
        <div class="form-item">
          <label>Y坐标比例</label>
          <input type="number" step="0.01" placeholder="0‑1" v-model="inputInfo.y">
        </div>
        <div class="form-item">
          <label>宽度比例</label>
          <input type="number" step="0.01" placeholder="0‑1" v-model="inputInfo.width">
        </div>
        <div class="form-item">
          <label>高度比例</label>
          <input type="number" step="0.01" placeholder="0‑1" v-model="inputInfo.height">
        </div>
        <div class="form-item">
          <label>备注</label>
          <textarea rows="2" placeholder="选填"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <div class="btn cancel" @click="cancelHandle">取消</div>
        <div class="btn confirm" @click="confirmAddHandle">确认新增</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;

  .modal-wrap {
    width: 440px;
    max-height: 85vh;
    background: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background-color: rgb(252, 232, 242);
      font-size: 16px;
      font-weight: 500;

      .close-btn {
        font-size: 22px;
        cursor: pointer;
        color: #666;

        &:hover {
          color: #f44;
        }
      }
    }

    .modal-body {
      padding: 16px;
      overflow-y: auto;
      flex: 1;

      .form-item {
        display: flex;
        align-items: center;
        margin-bottom: 12px;

        label {
          width: 120px;
          font-size: 14px;
          color: #444;
          flex-shrink: 0;
        }

        input,
        select,
        textarea {
          flex: 1;
          padding: 6px 8px;
          border: 1px solid #d8c8d8;
          border-radius: 4px;
          font-size: 14px;
        }

        textarea {
          resize: none;
        }
      }
    }

    .modal-footer {
      display: flex;
      gap: 12px;
      padding: 12px 16px;
      border-top: 1px solid #eee;

      .btn {
        flex: 1;
        text-align: center;
        padding: 8px 0;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
      }

      .cancel {
        background: #efefef;
      }

      .confirm {
        background: rgb(230, 244, 252);
      }

      .btn:hover {
        opacity: 0.85;
      }
    }
  }
}

.getKey {
  justify-content: center;
}

.getKey:hover {
  background-color: rgb(224, 232, 246);
}
</style>