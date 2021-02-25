import { execute } from "../helpers/sqliteconnector";

export async function getSetting(sqlQuery) {
  try {
    //console.log("sqlQuery",sqlQuery)
    //var res = await execute(sqlQuery).then((val) => val.rows._array[0].value);
    var val = await execute(sqlQuery);//.then((val) => val.rows._array[0].value);
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
