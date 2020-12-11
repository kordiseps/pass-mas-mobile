import * as SQLite from "expo-sqlite";

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
