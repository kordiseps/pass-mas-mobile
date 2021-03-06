import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import Header from "./components/header";
import Register from "./screens/register";
import PasswordList from "./screens/password-list";
import Login from "./screens/login";
import { ColorContext } from "./contexts/color-context";
import { GetColorsForContext } from "./contexts/db-context";
import { isFirst } from "./helpers/sqlite-connector";
import Loading from "./components/loading";

export default function Main() {
  const [dropped, setDropped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [colors, setColors] = useState({
    backColor: "#ffffff",
    mainColor: "#c65155",
    passiveColor: "#c45983",
    cancelColor: "#7659c3",
  });
  useEffect(() => {
    async function prepare() {
      console.log("prepare");
      const isFirstUsage = await isFirst();
      if (!isFirstUsage) {
        const colorsFromDb = await GetColorsForContext();
        setColors(colorsFromDb);
        setFirst(false);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
    prepare();
  }, [dropped]);
  function handleDropAccount() {
    //setLoggedIn(false);
    setFirst(true);
    setDropped(true);
  }
  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: 20, backgroundColor: colors.backColor }}
    >
      <ColorContext.Provider value={{ colors, setColors }}>
        <Header isLoggedIn={loggedIn} onDropAccount={handleDropAccount} />
        {loading ? (
          <Loading size={150} />
        ) : first ? (
          <Register registered={() => setFirst(false)} handleRestoreAccount = {handleDropAccount} />
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
