import type{ keyConfigList } from "./keyboards/keyboard";
import { phoneConfig } from "./phone/phone";

export interface configs {
  keyConfig:keyConfigList
  phoneConfig:phoneConfig
}
