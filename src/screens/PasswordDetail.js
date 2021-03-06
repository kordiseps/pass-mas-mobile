import React, { useContext, useEffect, useState } from "react";
import { View, Modal } from "react-native";
import styled from "styled-components/native";
import TextBox from "../components/TextBox";
import Label from "../components/Label";
import ColorPicker from "./ColorPicker";
import ColorButton from "../components/ColorButton";
import { ColorContext } from "../contexts/ColorContext";
import Loading from "../components/Loading";

const Div = styled.View`
  flex: 1;
`;

export default PasswordDetail = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [app, setApp] = useState(props.app);
  const [username, setUserName] = useState(props.username);
  const [password, setPassword] = useState(props.password);
  const [colorPickRequested, setColorPickRequested] = useState(false);
  const { colors } = useContext(ColorContext);
  const [color, setColor] = useState(colors.mainColor);
  useEffect(() => {}, []);

  function reset() {
    setApp("");
    setUserName("");
    setPassword("");
    setColor(colors.mainColor);
  }

  const handleSubmit = () => {
    if (app !== "" && username !== "" && password !== "" && color !== "") {
      setIsSubmitting(true);
      reset();
      props.onUpdate(app, username, password, color);
      setIsSubmitting(false);
    } else {
      alert("Tüm alanları doldurun");
    }
  };

  const handleCancel = () => {
    reset();
    props.onCancel();
    setIsSubmitting(false);
  };

  const handleColorSelect = (val) => {
    setColor(val);
    setColorPickRequested(false);
  };

  const handleColorPickRequested = () => {
    setColorPickRequested(true);
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <Div style={{ backgroundColor: colors.backColor }}>
        <Div style={{ marginTop: 50 }}>
          <Label>Düzenle</Label>
          <TextBox placeholder="Uygulama" text={app} setText={setApp} />
          <TextBox
            placeholder="Kullanıcı Adı"
            text={username}
            setText={setUserName}
          />
          <TextBox
            placeholder="Parola"
            text={password}
            setText={setPassword}
            isSecure
          />
          <ColorButton color={color} onPress={handleColorPickRequested}>
            Renk Seç
          </ColorButton>
          <ColorPicker
            visible={colorPickRequested}
            onSelect={handleColorSelect}
          />
          {isSubmitting ? (
            <Loading />
          ) : (
            <View>
              <ColorButton onPress={handleSubmit}>Kaydet</ColorButton>
              <ColorButton cancel onPress={handleCancel}>
                Vazgeç
              </ColorButton>
            </View>
          )}
        </Div>
      </Div>
    </Modal>
  );
};
//   <PasswordInpts
//     app={app}
//     setApp={setApp}
//     username={username}
//     setUserName={setUserName}
//     password={password}
//     setPassword={setPassword}
//     color={color}
//     handleColorPickRequested={handleColorPickRequested}
//     colorPickRequested={colorPickRequested}
//     handleColorSelect={handleColorSelect}
//   />
// const PasswordInpts = (props) => {
//   return (
//     <>
//       <TextBox placeholder="Uygulama" text={props.app} setText={props.setApp} />
//       <TextBox
//         placeholder="Kullanıcı Adı"
//         text={props.username}
//         setText={props.setUserName}
//       />
//       <TextBox
//         placeholder="Parola"
//         text={props.password}
//         setText={props.setPassword}
//         isSecure
//       />
//       <ColorButton color={props.color} onPress={props.handleColorPickRequested}>
//         Renk Seç
//       </ColorButton>
//       <ColorPicker
//         visible={props.colorPickRequested}
//         onSelect={props.handleColorSelect}
//       />
//     </>
//   );
// };
