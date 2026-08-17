// 根据你定义的 singleKey 接口生成示例配置：s、d、space、k、l
import type { keyConfigList } from './keyboard';

/**
 * 虚拟键码参考
 * s: 83
 * d: 68
 * space: 32
 * k: 75
 * l: 76
 *
 * 布局示例：5个按键横向均分屏幕下半部分 (y=0.6, height=0.4)
 */
const demoKeyConfig: keyConfigList = [
  {
    id: 1,
    keyCode: 83,
    keyName:'s',
    enabled: true,
    debounce: 0,
    x: 0.0,
    y: 0.0,
    width: 0.2,
    height: 0.1,
    keyBoxColor: [255, 80, 80],
    remark: 'S按键'
  },
  {
    id: 2,
    keyCode: 68,
    keyName:'d',
    enabled: true,
    debounce: 0,
    x: 0.2,
    y: 0.0,
    width: 0.2,
    height: 0.1,
    keyBoxColor: [80, 255, 80],
    remark: 'D按键'
  },
  {
    id: 3,
    keyCode: 32,
    keyName:'space',
    enabled: true,
    debounce: 0,
    x: 0.4,
    y: 0.0,
    width: 0.2,
    height: 0.1,
    keyBoxColor: [80, 140, 255],
    remark: '空格键'
  },
  {
    id: 4,
    keyCode: 75,
    keyName:'k',
    enabled: true,
    debounce: 0,
    x: 0.6,
    y: 0.0,
    width: 0.2,
    height: 0.1,
    keyBoxColor: [255, 220, 80],
    remark: 'K按键'
  },
  {
    id: 5,
    keyCode: 76,
    keyName:'l',
    enabled: true,
    debounce: 0,
    x: 0.8,
    y: 0.0,
    width: 0.2,
    height: 0.1,
    keyBoxColor: [200, 80, 255],
    remark: 'L按键'
  }
];

export default demoKeyConfig;