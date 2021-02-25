import React, { useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import TextBox from "../components/TextBox";
import styled from "styled-components/native";
import { saveUser } from "../dbContext/user";
import { dbInitialize } from "../dbContext/initialize";
import { makeRequest } from "../api/request";

const Div = styled.View`
  flex: 1;
`;

export default Register = (props) => {
  const [email, setEmail] = useState("test@test.com");
  const [pinCode, setPinCode] = useState("123123");
  const [confirmPinCode, setConfirmPinCode] = useState("123123");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (pinCode !== confirmPinCode) {
      await AsyncAlert("Hatalı İşlem", "Pin kodları eşleşmiyor");
    } else {
      let response = await submitRegisterForm(email, pinCode);

      if (response.isSuccess) {
        await AsyncAlert("İşlem Başarılı", "Kayıt işlemi başarılı");
        dbInitialize()
          .then(() => saveUser(email, pinCode))
          .then(() => props.registered());
      } else {
        await AsyncAlert(
          "İşlem Yapılamadı",
          `Sunucudan gelen hata : ${response.errors}`
        );
      }
    }
    setIsSubmitting(false);
  };
  return (
    <Div>
      <TextBox placeholder="E Mail" text={email} setText={setEmail} />
      <TextBox
        placeholder="Pin"
        text={pinCode}
        setText={setPinCode}
        isSecure
        isNumberOnly
      />
      <TextBox
        placeholder="Pin Onayla"
        text={confirmPinCode}
        setText={setConfirmPinCode}
        isSecure
        isNumberOnly
      />

      {isSubmitting ? (
        <ActivityIndicator color="red" />
      ) : (
        <ColorButton onPress={handleSubmit}>Kayıt Ol</ColorButton>
      )}
    </Div>
  );
};

async function submitRegisterForm(userMail, pinCode) {
  try {
    return await makeRequest(
      "https://pass-mas-api.herokuapp.com/users/register",
      "POST",
      {
        userMail: userMail,
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
