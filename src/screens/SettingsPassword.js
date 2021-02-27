import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native";
import { Modal } from "react-native";
import ColorButton from "../components/ColorButton";
import Label from "../components/Label";
import TextBox from "../components/TextBox";

export const SettingsPassword = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [processing, setProcessing] = useState(false);
  useEffect(() => {}, []);
  const handleChangeUserPassword = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false)
    }, 3000);
  };
  const handleCloseSettings = () => {
    props.onClose();
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={{ flex: 1, marginTop: 50 }}>
        <Label>Kullanıcı Parolası Ayarları</Label>
        <TextBox
          placeholder="Eski Parola"
          text={oldPassword}
          setText={setOldPassword}
          isSecure
        />
        <TextBox
          placeholder="Yeni Parola"
          text={newPassword}
          setText={setNewPassword}
          isSecure
        />
        <TextBox
          placeholder="Yeni Parola Onayla"
          text={newPasswordConfirm}
          setText={setNewPasswordConfirm}
          isSecure
        />
        {processing ? (
          <ActivityIndicator size="large" color="red" />
        ) : (
          <>
            <ColorButton onPress={handleChangeUserPassword}>
              Kullanıcı Parolasını Değiştir
            </ColorButton>
            <ColorButton onPress={handleCloseSettings}>Geri</ColorButton>
          </>
        )}
      </View>
    </Modal>
  );
};
