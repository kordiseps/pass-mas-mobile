import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Modal } from "react-native";
import ColorButton from "../components/ColorButton";
import Label from "../components/Label";

export const SettingsColorTheme = (props) => {
  useEffect(() => {}, []);
  const handleChangeMainColor = () => {};
  const handleChangePassiveColor = () => {};
  const handleChangeBackColor = () => {};
  const handleChangeCancelColor = () => {};
  const handleApplyLightTheme = () => {};
  const handleApplyDarkTheme = () => {};
  const handleCloseSettings = () => {
    props.onClose();
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={{ flex: 1, marginTop: 50 }}>
        <Label>Tema Ayarları</Label>
        <ColorButton onPress={handleChangeMainColor}>
          Ana Rengi Ayarla
        </ColorButton>
        <ColorButton onPress={handleChangePassiveColor}>
          Pasif Rengi Ayarla
        </ColorButton>
        <ColorButton onPress={handleChangeBackColor}>
          Arkaplan Rengi Ayarla
        </ColorButton>
        <ColorButton onPress={handleChangeCancelColor}>
          İptal Rengi Ayarla
        </ColorButton>
        <ColorButton onPress={handleApplyLightTheme}>
          Varsayılan Açık Tema Ayarlarını Uygula
        </ColorButton>
        <ColorButton onPress={handleApplyDarkTheme}>
          Varsayılan Koyu Tema Ayarlarını Uygula
        </ColorButton> 
        <ColorButton onPress={handleCloseSettings}>Geri</ColorButton>
      </View>
    </Modal>
  );
};
