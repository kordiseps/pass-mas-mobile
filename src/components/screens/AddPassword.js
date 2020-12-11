import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Modal, Text, Button } from "react-native";
import styled from "styled-components/native";
import TextBox from "../styledComponents/TextBox";
import Label from "../styledComponents/Label";
import ColorPicker from "./ColorPicker";
import ColorButton from "../styledComponents/ColorButton";

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

  function reset() {
    setApp("");
    setUserName("");
    setPassword("");
    setColor("#000000");
  }

  const handleSubmit = () => {
    setIsSubmitting(true);
    reset();
    props.onAdd(app, username, password, color);
    setIsSubmitting(false);
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
            <Button title="Vazgeç" onPress={handleCancel} />
            <Button title="Kaydet" onPress={handleSubmit} />
          </View>
        )}
      </Div>
    </Modal>
  );
};
