import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Modal } from "react-native";
import ColorButton from "../components/ColorButton";
import Label from "../components/Label";

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
    <Modal visible={props.visible} animationType="slide">
      <View style={{ flex: 1, marginTop: 50 }}>
        <Label>Kullanıcı Veri Silme Ayarları</Label>
        <ColorButton onPress={handleRemoveAccountFromDevice}>
          Bu cihazdan kullanıcıya ait tüm verileri sil
        </ColorButton>
        <ColorButton onPress={handleRemoveAccountFromServerAndDevice}>
          Bu cihazdan ve sunuclardan kullanıcıya ait tüm verileri sil
        </ColorButton>
        <ColorButton onPress={handleCloseSettings}>Ayarları kapat</ColorButton>
      </View>
    </Modal>
  );
};
