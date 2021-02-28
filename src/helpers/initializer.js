import {
  ColorsTableInitialize,
  PaswordsTableInitialize,
  SettingsTableInitialize,
  SuggestedColors,
} from "../constants/sqlScripts";
import { execute } from "./sqliteconnector";

export function initialize() {
  return new Promise(async (resolve, reject) => {
    try {
      await execute(PaswordsTableInitialize);
      await execute(SettingsTableInitialize);
      await execute(ColorsTableInitialize);
      await execute(SuggestedColors);
      console.log("initialize OK");
      resolve();
    } catch (error) {
      console.log("initialize error", error);
      reject(error);
    }
  });
}
