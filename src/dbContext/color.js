import { GetColors } from "../constants/sqlScripts";
import { execute } from "../tools/SqliteManager";

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

const isColor = (strColor) => {
  const s = new Option().style;
  s.color = strColor;
  return s.color !== "";
};
