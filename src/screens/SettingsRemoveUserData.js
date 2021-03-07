import React, { useEffect } from "react";
import { View } from "react-native";
import ColorButton from "../components/ColorButton";
import Label from "../components/Label";
import MyModal from "../components/MyModal";

export const SettingsRemoveUserData = (props) => {
  useEffect(() => {}, []);
  const handleRemoveAccountFromDevice = () => {
    console.log("handleRemoveAccountFromDevice");
  };
  const handleRemoveAccountFromServerAndDevice = () => {
    console.log("handleRemoveAccountFromServerAndDevice");
  };
  const handleCloseSettings = () => {
    props.onClose();
  };

  return (
    <MyModal visible={props.visible}>
      <Label>Kullanıcı Veri Silme Ayarları</Label>
      <ColorButton onPress={handleRemoveAccountFromDevice}>
        Bu cihazdan kullanıcıya ait tüm verileri sil
      </ColorButton>
      <ColorButton onPress={handleRemoveAccountFromServerAndDevice}>
        Bu cihazdan ve sunuclardan kullanıcıya ait tüm verileri sil
      </ColorButton>
      <ColorButton cancel onPress={handleCloseSettings}>
        Ayarları kapat
      </ColorButton>
    </MyModal>
  );
};
