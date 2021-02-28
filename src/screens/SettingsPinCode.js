import React, { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { View } from "react-native";
import { Modal } from "react-native";
import ColorButton from "../components/ColorButton";
import Label from "../components/Label";
import Loading from "../components/Loading";
import TextBox from "../components/TextBox";
import { UpdateLoginPinCode } from "../contexts/dbContext";

export const SettingsPassword = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [processing, setProcessing] = useState(false);
  useEffect(() => {}, []);
  const handleChangeUserPassword = async () => {
    Keyboard.dismiss();
    if (newPassword !== newPasswordConfirm) {
      alert("Pin Kodları eşleşmiyor");
      return;
    }
    if (newPassword.length!==6) {
      alert("Yeni pin kodu geçersiz, 6 karakter olmalı.");
      return;
    }
    if (isNaN(newPassword)) {
      alert("Yeni pin kodu geçersiz, sadece sayılardan oluşmalı");
      return;
    }
    setProcessing(true);
    var res = await UpdateLoginPinCode(oldPassword, newPassword);
    alert(res);
    setProcessing(false);
  };
  const handleCloseSettings = () => {
    setOldPassword("");
    setNewPassword("");
    setNewPasswordConfirm("");
    props.onClose();
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={{ flex: 1, marginTop: 50 }}>
        <Label>Kullanıcı Pin Kodu Ayarları</Label>
        <TextBox
          placeholder="Eski Pin Kodu"
          text={oldPassword}
          setText={setOldPassword}
          isSecure
          isNumberOnly
        />
        <TextBox
          placeholder="Yeni Pin Kodu"
          text={newPassword}
          setText={setNewPassword}
          isSecure
          isNumberOnly
        />
        <TextBox
          placeholder="Yeni Pin Kodu Onayla"
          text={newPasswordConfirm}
          setText={setNewPasswordConfirm}
          isSecure
          isNumberOnly
        />
        {processing ? (
          <Loading />
        ) : (
          <>
            <ColorButton onPress={handleChangeUserPassword}>
              Kullanıcı Pin Kodusını Değiştir
            </ColorButton>
            <ColorButton onPress={handleCloseSettings}>Geri</ColorButton>
          </>
        )}
      </View>
    </Modal>
  );
};
