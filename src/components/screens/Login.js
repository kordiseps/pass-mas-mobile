import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View, Alert, Text, Button } from "react-native";
import styled from "styled-components/native";
import { getUserMail, getUserPinCode } from "../../dbContext/user";
import Label from "../styledComponents/Label";
import TextBox from "../styledComponents/TextBox";
import ColorButton from "../styledComponents/ColorButton";
import { getMainColor } from "../../dbContext/color";
import BorderedDiv from "../styledComponents/BorderedDiv";
import { ColorContext } from "../../contexts/ColorContext";

const Div = styled.View`
  flex: 1;
`;

export default Login = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [pinCode, setPinCode] = useState("");
  const [userName, setUserName] = useState("");

  const { colors } = useContext(ColorContext);

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
        <ActivityIndicator color="red" />
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
