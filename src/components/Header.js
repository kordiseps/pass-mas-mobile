import React, { useState,useContext } from "react";
import { StyleSheet } from "react-native";
import { Settings } from "../screens/Settings";
import ColorButton from "./ColorButton";
import styled from "styled-components/native";
import { ColorContext } from "../contexts/ColorContext";

const Div = styled.View`
  width: 100%;
  height: 50px;
  padding: 3%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Text = styled.Text`
  font-weight: bold;
  font-size: 24px;
`;

const Header = (props) => {
  const { colors } = useContext(ColorContext);
  const [settings, setSettings] = useState(false);
  const handleOpenSettings = () => {
    if (props.isLoggedIn) {
      setSettings(true);
    }
  };
  return (
    <Div style={{ backgroundColor: colors.backColor }}>
      <Text style={{ color: colors.mainColor }}>PASS-MAS</Text>
      {props.isLoggedIn ? (
        <ColorButton onPress={handleOpenSettings}>🔧</ColorButton>
      ) : (
        <Text/>
      )}
      <Settings
        visible={settings}
        onClose={() => {
          setSettings((o) => !o);
        }}
      />
    </Div>
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
