import React, { useContext, useEffect, useState } from "react";
import { View, Alert } from "react-native";
import styled from "styled-components/native";
import Label from "../components/Label";
import TextBox from "../components/TextBox";
import ColorButton from "../components/ColorButton";
import { getUserPinCode, getUserMail } from "../contexts/dbContext";
import Loading from "../components/Loading";

const Div = styled.View`
  flex: 1;
`;

export default Login = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [pinCode, setPinCode] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function prepareData() {
      var userMail = await getUserMail();
      setUserName(userMail);
      setLoading(false);
    }
    prepareData();
  }, []);

  handleLogin = async () => {
    let userPinCode = await getUserPinCode();
    if (pinCode === userPinCode) {
      props.loggedIn();
    } else {
      AsyncAlert("Pin Kodu Yanlış", `Pin Kodu Yanlış`);
    }
  };
  return (
    <Div>
      {isLoading ? (
        <Loading size={150} />
      ) : (
        <View>
          <Label>{userName}</Label>
          <TextBox isSecure isNumberOnly text={pinCode} setText={setPinCode} />
          <ColorButton onPress={handleLogin}>Giriş Yap</ColorButton>
        </View>
      )}
    </Div>
  );
};

const AsyncAlert = (title, message) => {
  return new Promise((resolve, reject) => {
    Alert.alert(
      title,
      message,
      [
        { text: "Tamam", onPress: () => resolve("YES") },
        //{text: 'NO', onPress: () => resolve('NO') }
      ],
      { cancelable: false }
    );
  });
};
