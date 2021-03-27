import React, { useEffect, useState } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import Label from "../components/label";
import TextBox from "../components/text-box";
import ColorButton from "../components/color-button";
import { getUserPinCode, getUserMail } from "../contexts/db-context";
import Loading from "../components/loading";
import { AsyncAlert } from "../components/async-alert";

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
