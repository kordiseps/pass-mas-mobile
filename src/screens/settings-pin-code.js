import React, { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import ColorButton from "../components/color-button";
import Label from "../components/label";
import Loading from "../components/loading";
import TextBox from "../components/text-box";
import { UpdateLoginPinCode } from "../contexts/db-context";
import MyModal from "../components/my-modal";

export const SettingsPassword = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [processing, setProcessing] = useState(false);
  useEffect(() => {}, []);
  const handleChangeUserPassword = async () => {
    Keyboard.dismiss();

    if (
      oldPassword.length === 0 ||
      newPassword.length === 0 ||
      newPasswordConfirm.length === 0
    ) {
      alert("Tüm alanları doldurmalısınız.");
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      alert("Pin kodları eşleşmiyor");
      return;
    }
    if (newPassword.length !== 6) {
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
    <MyModal visible={props.visible}>
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
          <ColorButton cancel onPress={handleCloseSettings}>
            Geri
          </ColorButton>
        </>
      )}
    </MyModal>
  );
};
