import { GetColor } from "../constants/sqlScripts";
import { getSetting } from "./setting";

function getColor(location,onSuccess, onError) {
  return getSetting(GetColor(location),onSuccess, onError);
}

export function getBackColor(onSuccess, onError) {
  return getColor("backColor",onSuccess, onError);
}

