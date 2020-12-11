import { execute } from "../tools/SqliteManager";

export function getSetting(sqlQuery) {
  try {
    return execute(sqlQuery).then((val) => val.rows._array[0].value);
  } catch (err) {
    console.log("getSetting err", err);
    return {
      errors: err,
    };
  }
}
