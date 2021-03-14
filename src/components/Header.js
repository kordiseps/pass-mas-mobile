import React, { useState, useContext } from "react";
import { StyleSheet } from "react-native";
import { Settings } from "../screens/settings";
import ColorButton from "./color-button";
import styled from "styled-components/native";
import { ColorContext } from "../contexts/color-context";

const Div = styled.View`
  width: 100%;
  height: 50px;
  padding-top: 3%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Text = styled.Text`
  font-weight: bold;
  font-size: 24px;
`;

const SmallDiv = styled(Div)`
  width: 30%;
`;
const Header = (props) => {
  const { colors } = useContext(ColorContext);
  const [settings, setSettings] = useState(false);
  const handleOpenSettings = () => {
    if (props.isLoggedIn) {
      setSettings(true);
    }
  };
  
  function handleDropAccount() {
    setSettings(false);
    props.onDropAccount()
  }
  return (
    <Div style={{ backgroundColor: colors.backColor }}>
      <Text style={{ color: colors.mainColor }}>PASS-MAS</Text>
      {props.isLoggedIn ? (
        <SmallDiv>
          <ColorButton onPress={handleOpenSettings}>🔧</ColorButton>
        </SmallDiv>
      ) : (
        <Text />
      )}
      <Settings
        visible={settings}
        onClose={() => {
          setSettings((o) => !o);
        }}
        onDropAccount={handleDropAccount}
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
