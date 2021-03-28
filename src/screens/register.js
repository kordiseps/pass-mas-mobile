import React, { useState } from "react";
import TextBox from "../components/text-box";
import styled from "styled-components/native";
import { submitRegisterForm } from "../helpers/api-connector";
import { initialize } from "../helpers/initializer"; 
import Loading from "../components/loading";
import { AsyncAlert } from "../components/async-alert";
import { Restore } from "./restore";
import { saveUser } from "../contexts/db-context";

const Div = styled.View`
  flex: 1;
`;

export default Register = (props) => {
  const [email, setEmail] = useState("test@test.com");
  const [pinCode, setPinCode] = useState("123123");
  const [confirmPinCode, setConfirmPinCode] = useState("123123");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [restoreRequested, setRestoreRequested] = useState(false);

  function handleRestore() {
    setRestoreRequested(true);
  }
  function onRestore() {
    props.handleRestoreAccount()
  }
  function onCancelRestore() {
    setRestoreRequested(false);
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    if (pinCode !== confirmPinCode) {
      await AsyncAlert("Hatalı İşlem", "Pin kodları eşleşmiyor");
      setIsSubmitting(false);
    } else {
      let response = await submitRegisterForm(email, pinCode);
      if (response.isSuccess) {
        await AsyncAlert("İşlem Başarılı", "Kayıt işlemi başarılı");
        try {
          await initialize();
          await saveUser(email, pinCode);
          props.registered();
        } catch (error) {
          await AsyncAlert("İşlem Yapılamadı", `Oluşan hata : ${error}`);
          setIsSubmitting(false);
        }
      } else {
        await AsyncAlert(
          "İşlem Yapılamadı",
          `Sunucudan gelen hata : ${response.errors}`
        );
        setIsSubmitting(false);
      }
    }
  }
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
        <Loading />
      ) : (
        <ColorButton onPress={handleSubmit}>Kayıt Ol</ColorButton>
      )}
      <ColorButton onPress={handleRestore}>Zaten Kayıtlı mısınız?</ColorButton>
      <Restore visible={restoreRequested} onCancelRestore={onCancelRestore} onRestore= {onRestore}/>
    </Div>
  );
};
