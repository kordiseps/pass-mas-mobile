import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Modal } from "react-native";
import ColorButton from "../components/ColorButton";
import Label from "../components/Label";

export const SettingsSynchronize = (props) => {
  useEffect(() => {}, []);
  const handleSynchronize = () => {
    console.log("handleSynchronize");
  };
  const handleDeleteFromServerAndSendData = () => {
    console.log("handleDeleteFromServerAndSendData");
  };
  const handleCloseSettings = () => {
    props.onClose();
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={{ flex: 1, marginTop: 50 }}>
        <Label>Senkronizasyon Ayarları</Label>
        <ColorButton onPress={handleSynchronize}>
          Tüm verileri sunucuyla senkronize et
        </ColorButton>
        <ColorButton onPress={handleDeleteFromServerAndSendData}>
          Sunucudaki tüm verileri sil, cihazdaki verileri sunucuya gönder
        </ColorButton>
        <ColorButton onPress={handleCloseSettings}>Geri</ColorButton>
      </View>
    </Modal>
  );
};
