//单个key对应的所有配置
export interface keyConfig extends addKeyInfo{
  id:number;
  keyCode:number;
  keyName:string
  enabled: boolean;

  //用户自定义颜色rgb
  keyBoxColor:[number,number,number]

  remark?: string;     // 可选：用户自定义备注
}

export interface addKeyInfo{
  keyCode:number
  keyName:string
  debounce:number|0//单位ms，默认0
  x: number;                // 左上角X相对坐标 (0~1)
  y: number;                // 左上角Y相对坐标 (0~1)
  width: number;            // 区域宽度相对比例 (0~1)
  height: number;           // 区域高度相对比例 (0~1)
}


export type keyConfigList=keyConfig[]