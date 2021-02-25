import { GetTables } from "../constants/sqlScripts";
import { execute } from "../helpers/sqliteconnector";
import {
  PaswordsTableInitialize,
  SettingsTableInitialize,
  ColorsTableInitialize,
  SuggestedLightModeColors,
} from "../constants/sqlScripts";

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
          execute(SuggestedLightModeColors).then(() => {
            console.log("DbInitialize OK");
          });
        });
      });
    });
  } catch (err) {
    console.log("dbInitialize err", err);
    return false;
  }

  //console.log("DbInitialize");
  // sqliteManager = new SqliteManager();
  // sqliteManager
  //   .execute(PaswordsTableInitialize)
  //   .then(() => {
  //     //console.log("PaswordsInitialize succ");
  //     sqliteManager
  //       .execute(SettingsTableInitialize)
  //       .then(() => {
  //         //console.log("SettingsInitialize succ");
  //         sqliteManager
  //           .execute(ColorsTableInitialize)
  //           .then(() => {
  //             //console.log("ColorsInitialize succ");
  //             console.log("DbInitialize OK");
  //             onSuccess();
  //           })
  //           .catch((error) => {
  //             console.log("ColorsInitialize fail", error);
  //             onError(error);
  //           });
  //       })
  //       .catch((error) => {
  //         console.log("SettingsInitialize fail", error);
  //         onError(error);
  //       });
  //   })
  //   .catch((error) => {
  //     console.log("PaswordsInitialize fail", error);
  //     onError(error);
  //   });
}
