import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View, Modal, Text, Button } from "react-native";
import styled from "styled-components/native";
import TextBox from "../styledComponents/TextBox";
import Label from "../styledComponents/Label";
import ColorPicker from "./ColorPicker";
import ColorButton from "../styledComponents/ColorButton";
import { ColorContext } from "../../contexts/ColorContext";

const Div = styled.View`
  flex: 1;
`;

export default AddPassword = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [app, setApp] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("#000000");
  const [colorPickRequested, setColorPickRequested] = useState(false);
  const { colors } = useContext(ColorContext);
  useEffect(() => {}, []);

  function reset() {
    setApp("");
    setUserName("");
    setPassword("");
    setColor("#000000");
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
    <Modal visible={props.visible} animationType="slide">
      <Div>
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
        <ColorPicker
          visible={colorPickRequested}
          onSelect={handleColorSelect}
        />

        {isSubmitting ? (
          <ActivityIndicator color="red" />
        ) : (
          <View>
            <ColorButton color={colors.mainColor} onPress={handleCancel}>
              Vazgeç
            </ColorButton>
            <ColorButton color={colors.mainColor} onPress={handleSubmit}>
              Kaydet
            </ColorButton>
          </View>
        )}
      </Div>
    </Modal>
  );
};
