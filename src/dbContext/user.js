import {
  GetUserMail,
  InsertUser,
  DeleteUsers,
  GetUserPinCode,
} from "../constants/sqlScripts";
import { execute } from "../tools/SqliteManager";
import { getSetting } from "./setting";

export function saveUser(userMail, pinCode) {
  try {
    return execute(DeleteUsers).then(() => {
      console.log("DeleteUsers succ");
      let sqlString = InsertUser(userMail, pinCode);
      execute(sqlString).then((val) => {
        console.log("InsertUser succ");
        return true;
      });
    });
  } catch (err) {
    console.log("saveUser err", err);
    return false;
  }
}
export function getUserMail() {
  return getSetting(GetUserMail);
}

export function getUserPinCode() {
  return getSetting(GetUserPinCode);
}
