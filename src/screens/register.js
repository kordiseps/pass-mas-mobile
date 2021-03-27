import React, { useState } from "react"; 
import TextBox from "../components/text-box";
import styled from "styled-components/native";
import { submitRegisterForm } from "../helpers/api-connector";
import { initialize } from "../helpers/initializer";
import { InsertUser } from "../constants/sql-scripts";
import { execute } from "../helpers/sqlite-connector";
import Loading from "../components/loading";
import { AsyncAlert } from "../components/async-alert";

const Div = styled.View`
  flex: 1;
`;

export default Register = (props) => {
  const [email, setEmail] = useState("test@test.com");
  const [pinCode, setPinCode] = useState("123123");
  const [confirmPinCode, setConfirmPinCode] = useState("123123");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      <ColorButton onPress={handleSubmit}>Zaten Kayıtlı mısınız?</ColorButton>
    </Div>
  );
};



export function saveUser(userMail, pinCode) {
  return new Promise(async (resolve, reject) => {
    try {
      // await execute(DeleteUsers);
      // console.log("DeleteUsers succ");
      let sqlString = InsertUser(userMail, pinCode);
      await execute(sqlString);
      console.log("saveUser OK");
      resolve();
    } catch (error) {
      console.log("saveUser error", error);
      reject(error);
    }
  });
}
