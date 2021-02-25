import {
  GetPasswords,
  InsertApiIdPassword,
  InsertPassword,
} from "../constants/sqlScripts";
import { execute } from "../helpers/sqliteconnector";

export function savePassword(app, username, password, color) {
  let sqlString = InsertPassword(app, username, password, color);
  try {
    return execute(sqlString);
  } catch (err) {
    console.log("savePassword err", err);
    return {
      errors: err,
    };
  }
}

export function insertApiIdPassword(id, apiId) {
  console.log("insertApiIdPassword bg");
  let sqlString = InsertApiIdPassword(id, apiId);
  try {
    return execute(sqlString);
  } catch (err) {
    console.log("insertApiIdPassword err", err);
    return {
      errors: err,
    };
  }
}

export function getPasswords() {
  try {
    return execute(GetPasswords).then((val) => val.rows._array);
  } catch (err) {
    console.log("getPasswords err", err);
    return {
      errors: err,
    };
  }
}
