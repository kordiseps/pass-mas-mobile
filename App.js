import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "./src/components/Header";
import Register from "./src/components/screens/Register";
import * as FileSystem from "expo-file-system";
import PasswordList from "./src/components/screens/PasswordList";
import Login from "./src/components/screens/Login";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const rootDir = await FileSystem.readDirectoryAsync(
        FileSystem.documentDirectory
      );

      if (rootDir.length > 0) {
        if (rootDir.some((item) => item === "SQLite")) {
          const sqliteDir = await FileSystem.readDirectoryAsync(
            FileSystem.documentDirectory + "SQLite"
          );

          if (sqliteDir.some((item) => item === "app.db")) {
            setFirst(false);
          }
        }
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    fetchData();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
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
    </SafeAreaView>
  );
}
