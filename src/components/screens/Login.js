import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Alert, Text, Button } from "react-native";
import styled from "styled-components/native";
import { getUserMail, getUserPinCode } from "../../dbContext/user";
import Label from "../styledComponents/Label";
import TextBox from "../styledComponents/TextBox";

const Div = styled.View`
  flex: 1;
`;

export default Login = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [pinCode, setPinCode] = useState("");
  const [userName, setUserName] = useState("");
  useEffect(() => {
    async function prepareData() {
      let userMail = await getUserMail();
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
          <TextBox isSecure isNumberOnly setText={setPinCode} />
          <Button title="Giriş Yap " onPress={handleLogin} />
        </View>
      )}
    </Div>
  );
};

async function submitRegisterForm(email, pinCode) {
  try {
    return await makeRequest(
      "https://pass-mas-api.herokuapp.com/users/register",
      "POST",
      {
        userMail: email,
        pinCode: pinCode,
      }
    );
  } catch (err) {
    console.log(err);
    return {
      errors: err,
    };
  }
}

async function makeRequest(uri, method, data) {
  return fetch(uri, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "Mobile App",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      return response
        .json()
        .catch(() => {
          throw new Error(response.text());
        })
        .then((resposeData) => {
          return resposeData;
        });
    }
    return response.json();
  });
}

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
