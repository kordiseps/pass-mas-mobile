import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Settings } from "../screens/Settings";
import ColorButton from "./ColorButton";

const Header = (props) => {
  const [settings, setSettings] = useState(false);
  const handleOpenSettings = () => {
    if(props.isLoggedIn){
      setSettings(true)
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>PASS-MAS</Text>
      <ColorButton onPress={handleOpenSettings}>🔧</ColorButton>
      <Settings
        visible={settings}
        onClose={() => {
          setSettings((o) => !o);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "5%",
    backgroundColor: "#fff",
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontWeight: "bold",
    fontSize: 24,
  },
});

export default Header;
