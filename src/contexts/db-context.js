import { execute } from "../helpers/sqlite-connector";
import {
  GetPasswords,
  InsertApiIdPassword,
  InsertPassword,
  GetColors,
  GetUserPinCode,
  UpdateUserPinCode,
  SetColor,
  GetUserMail,
  MarkPasswordDeleted,
  DeletePassword,
  UpdatePassword,
  DropColors,
  DropPaswords,
  DropSettings,
  MarkPasswordSynchronized,
  GetPasswordsToSync,
} from "../constants/sql-scripts";

export function GetColorsForContext() {
  return new Promise(async (resolve, reject) => {
    try {
      var colorsInDb = await execute(GetColors);
      var _array = colorsInDb.rows._array;
      var colorsObject = new Object();
      _array.forEach((element) => {
        colorsObject[element.location] = element.value;
      });
      resolve(colorsObject);
    } catch (error) {
      console.log("GetColors error", error);
      reject(error);
    }
  });
}

export function SetColors(val) {
  return new Promise(async (resolve, reject) => {
    try {
      Object.getOwnPropertyNames(val).forEach(async (propertyName) => {
        var sqlString = SetColor(propertyName, val[propertyName]);        
        await execute(sqlString);
      });
      resolve();
    } catch (error) {
      console.log("SetColors error", error);
      reject(error);
    }
  });
}

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

export function markPasswordDeleted(id) {
  let sqlString = MarkPasswordDeleted(id);
  try {
    return execute(sqlString);
  } catch (err) {
    console.log("markPasswordDeleted err", err);
    return {
      errors: err,
    };
  }
}

export function deletePassword(id) {
  let sqlString = DeletePassword(id);
  try {
    return execute(sqlString);
  } catch (err) {
    console.log("deletePassword err", err);
    return {
      errors: err,
    };
  }
}

export function updatePassword(id, app, username, password, color) {
  let sqlString = UpdatePassword(id, app, username, password, color);
  try {
    return execute(sqlString);
  } catch (err) {
    console.log("updatePassword err", err);
    return {
      errors: err,
    };
  }
}

export function markPasswordSynchronized(id) {
  let sqlString = MarkPasswordSynchronized(id);
  try {
    return execute(sqlString);
  } catch (err) {
    console.log("markPasswordSynchronized err", err);
    return {
      errors: err,
    };
  }
}

export function insertApiIdPassword(id, apiId) {
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

export function getPasswordsToSync() {
  try {
    return execute(GetPasswordsToSync).then((val) => val.rows._array);
  } catch (err) {
    console.log("getPasswords err", err);
    return {
      errors: err,
    };
  }
}

async function getSetting(sqlQuery) {
  try {
    var val = await execute(sqlQuery); 
    var res = val.rows._array[0].value;
    return res;
  } catch (err) {
    console.log("getSetting err", err);
    return {
      errors: err,
    };
  }
}

export function getUserMail() {
  return getSetting(GetUserMail);
}

export function getUserPinCode() {
  return getSetting(GetUserPinCode);
}

export async function UpdateLoginPinCode(oldPinCode, newPinCode) {
  var oldPinCodeLocally = await getSetting(GetUserPinCode);
  if (oldPinCodeLocally !== oldPinCode) {
    return "BAŞARISIZ, ESKİ PİN KODU YANLIŞ";
  }
  let sqlString = UpdateUserPinCode(newPinCode);
  try {
    await execute(sqlString);
    return "BAŞARILI";
  } catch (error) {
    return "BAŞARISIZ, " + error;
  }
}

export async function DropAccount() {
  try {
    await execute(DropColors);
    await execute(DropPaswords);
    await execute(DropSettings);
    return true;
  } catch (error) {
    console.log("DropAccount", err);
    return false;
  }
}
