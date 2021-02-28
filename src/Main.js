import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import Header from "./components/Header";
import Register from "./screens/Register";
import * as FileSystem from "expo-file-system";
import PasswordList from "./screens/PasswordList";
import Login from "./screens/Login";
import { ColorContext } from "./contexts/ColorContext";
import { GetColorsForContext, SetMainColors } from "./contexts/dbContext";
import { isFirst } from "./helpers/sqliteconnector";
import Loading from "./components/Loading";

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
    async function prepare() {
      const isFirstUsage = await isFirst()
      if (!isFirstUsage) {
        //await SetMainColors()
        
        const colorsFromDb = await GetColorsForContext();
        setColors(colorsFromDb)
        setFirst(false);
        setLoading(false);
      } else {
        setFirst(true);
        setLoading(false);
      }
    }
    prepare();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 20, backgroundColor:colors.backColor }}>
      <ColorContext.Provider value={{colors, setColors}}>
        <Header isLoggedIn={loggedIn} />
        {loading ? (
          <Loading size={150}/>
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
