import { execute } from "../helpers/sqliteconnector";
import {
  GetPasswords,
  InsertApiIdPassword,
  InsertPassword,
  GetTables,
  PaswordsTableInitialize,
  SettingsTableInitialize,
  ColorsTableInitialize,
  SuggestedColors,
  GetColors,
  GetUserPinCode,
  UpdateUserPinCode,
  SetColor,
} from "../constants/sqlScripts";

export function GetColorsForContext() {
  console.log("GetColorContext");
  return new Promise(async (resolve, reject) => {
    try {
      var colorsInDb = await execute(GetColors);
      var _array = colorsInDb.rows._array;
      var colorsObject = new Object();
      _array.forEach((element) => {
        colorsObject[element.location] = element.value;
      });
      //console.log("GetColorContext colorsObject", colorsObject);
      resolve(colorsObject);
    } catch (error) {
      console.log("GetColors error", error);
      reject(error);
    }
  });
}

export function SetMainColors() {
  console.log("1");
  return new Promise(async (resolve, reject) => {
    try {
      var sqlString = SetColor("mainColor","red")
      console.log(sqlString)
      await execute(sqlString);
      resolve();
    } catch (error) {
      console.log("GetColors error", error);
      reject(error);
    }
  });
}

export function SetColors(val) {
  console.log("SetColorContext");
  return new Promise(async (resolve, reject) => {
    try {
      Object.getOwnPropertyNames(val).forEach(async (propertyName)=>{
        var sqlString = SetColor(propertyName,val[propertyName])
        console.log(sqlString)
        await execute(sqlString);
      })   
      resolve();
    } catch (error) {
      console.log("GetColors error", error);
      reject(error);
    }
  });
}

export function getTables() {
  try {
    return execute(GetTables).then((val) => val.rows._array);
  } catch (err) {
    console.log("GetTables err", err);
    return {
      errors: err,
    };
  }
}

export function dbInitialize() {
  try {
    return execute(PaswordsTableInitialize).then(() => {
      execute(SettingsTableInitialize).then(() => {
        execute(ColorsTableInitialize).then(() => {
          execute(SuggestedColors).then(() => {
            console.log("DbInitialize OK");
          });
        });
      });
    });
  } catch (err) {
    console.log("dbInitialize err", err);
    return false;
  }
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

export async function getSetting(sqlQuery) {
  try {
    //console.log("sqlQuery",sqlQuery)
    //var res = await execute(sqlQuery).then((val) => val.rows._array[0].value);
    var val = await execute(sqlQuery); //.then((val) => val.rows._array[0].value);
    //console.log("val",val)
    var res = val.rows._array[0].value;
    //console.log("res",res)
    return res;
  } catch (err) {
    console.log("getSetting err", err);
    return {
      errors: err,
    };
  }
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
