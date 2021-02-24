import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import Header from "./components/Header";
import Register from "./components/screens/Register";
import * as FileSystem from "expo-file-system";
import PasswordList from "./components/screens/PasswordList";
import Login from "./components/screens/Login";
import { ColorContext } from "./contexts/ColorContext";
import { GetColorsForContext } from "./dbContext/color";

export default function Main() {
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [colors, setColors] = useState({
    backColor: "#ededed",
    mainColor: "#0C1618",
    passiveColor: "#335b63",
    cancelColor: "#333025",
  });
  useEffect(() => {
    async function prp() {
      const dbExist = await DoesDbExist();
      if (dbExist) {
        const colorsFromDb = await GetColorsForContext();
        //console.log("ColorTest in Mainjs", colorsFromDb);
        setColors(colorsFromDb)
        setFirst(false);
        setLoading(false);
      } else {
        setFirst(true);
        setLoading(false);
      }
    }
    prp();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
      <ColorContext.Provider value={{colors, setColors}}>
        <Header />
        {loading ? (
          <ActivityIndicator size="large" color="red" />
        ) : first ? (
          <Register registered={() => setFirst(false)} />
        ) : !loggedIn ? (
          <Login
            loggedIn={() => {
              setLoggedIn(true);
            }}
          />
        ) : (
          <PasswordList />
        )}
      </ColorContext.Provider>
    </SafeAreaView>
  );
}

async function DoesDbExist() {
  const rootDir = await FileSystem.readDirectoryAsync(
    FileSystem.documentDirectory
  );

  if (rootDir.length > 0) {
    if (rootDir.some((item) => item === "SQLite")) {
      const sqliteDir = await FileSystem.readDirectoryAsync(
        FileSystem.documentDirectory + "SQLite"
      );
      if (sqliteDir.some((item) => item === "app.db")) {
        return true;
      } else {
        return false;
      }
    }
  }
}
