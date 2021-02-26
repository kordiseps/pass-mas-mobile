import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import Header from "./components/Header";
import Register from "./screens/Register";
import * as FileSystem from "expo-file-system";
import PasswordList from "./screens/PasswordList";
import Login from "./screens/Login";
import { ColorContext } from "./contexts/ColorContext";
import { GetColorsForContext } from "./contexts/dbContext";
import { isFirst } from "./helpers/sqliteconnector";

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
      const isFirstUsage = await isFirst()
      if (!isFirstUsage) {
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
