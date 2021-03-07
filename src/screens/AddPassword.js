import React, { useContext, useEffect, useState } from "react";
import { View, Modal } from "react-native";
import styled from "styled-components/native";
import TextBox from "../components/TextBox";
import Label from "../components/Label";
import ColorPicker from "./ColorPicker";
import ColorButton from "../components/ColorButton";
import { ColorContext } from "../contexts/ColorContext";
import Loading from "../components/Loading";
import Choise from "../components/Choise";
import MyModal from "../components/MyModal";

const Div = styled.View`
  flex: 1;
`;

export default AddPassword = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [app, setApp] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
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
      props.onAdd(app, username, password, color);
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
    <MyModal visible={props.visible}>
      <Label>Yeni Parola Kaydet</Label>
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
      <ColorPicker visible={colorPickRequested} onSelect={handleColorSelect} />

      {isSubmitting ? (
        <Loading />
      ) : (
        <Choise
          onOk={handleSubmit}
          Ok="Kaydet"
          onCancel={handleCancel}
          Cancel="Vazgeç"
        />
      )}
    </MyModal>
  );
};
