import * as SQLite from "expo-sqlite";
import { GetPasswords } from "../constants/sql-scripts";

export function execute(sqlString) {
  db = SQLite.openDatabase("app.db");
  return new Promise((resolve, reject) => {
    this.db.transaction((tx) => {
      tx.executeSql(
        sqlString,
        [],
        (tx, val) => resolve(val),
        (_, err) => reject(err)
      );
    });
  });
}

export function isFirst() {
  return new Promise(async (resolve, reject) => {
    try {
      var result = await execute(GetPasswords);      
      resolve(false);
    } catch {
      console.log("isFirst true")
      resolve(true);
    }
  });
}
