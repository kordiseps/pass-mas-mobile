import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import ColorButton from "../components/ColorButton";
import Label from "../components/Label";
import { ColorContext } from "../contexts/ColorContext";
import { SetColors } from "../contexts/dbContext";
import MyModal from "../components/MyModal";

export const SettingsColorTheme = (props) => {
  const [callBack, setCallBack] = useState(null);
  const [colorPickRequested, setColorPickRequested] = useState(false);

  const colorContext = useContext(ColorContext);
  const [colors, setColors] = useState({});
  useEffect(() => {
    setColors(colorContext.colors);
  }, []);

  async function afterCallback(newColors) {
    setColors(newColors);
    await SetColors(newColors);
    colorContext.setColors(newColors);
    setCallBack(null);
    setColorPickRequested(false);
  }

  const handleChangeMainColor = () => {
    setCallBack(() => changeMainColorCallback);
    setColorPickRequested(true);
  };
  const changeMainColorCallback = (val) => {
    afterCallback({ ...colors, mainColor: val });
  };

  const handleChangePassiveColor = () => {
    setCallBack(() => changePassiveColorCallback);
    setColorPickRequested(true);
  };
  const changePassiveColorCallback = (val) => {
    afterCallback({ ...colors, passiveColor: val });
  };

  const handleChangeBackColor = () => {
    setCallBack(() => changeBackColorCallback);
    setColorPickRequested(true);
  };
  const changeBackColorCallback = (val) => {
    afterCallback({ ...colors, backColor: val });
  };

  const handleChangeCancelColor = () => {
    setCallBack(() => changeCancelColorCallback);
    setColorPickRequested(true);
  };
  const changeCancelColorCallback = (val) => {
    afterCallback({ ...colors, cancelColor: val });
  };

  const handleApplyLightTheme = () => {
    afterCallback({
      backColor: "#ffffff",
      mainColor: "#c65155",
      passiveColor: "#c45983",
      cancelColor: "#7659c3",
    });
  };
  const handleApplyDarkTheme = () => {
    afterCallback({
      backColor: "#223548",
      mainColor: "#eec537",
      passiveColor: "#9c8b2f",
      cancelColor: "#e76880",
    });
  };
  const handleCloseSettings = () => {
    props.onClose();
  };

  const handleColorSelect = async (val) => {
    await callBack(val);
    setColorPickRequested(false);
  };
  // const [colors, setColors] = useState({
  //   backColor: "#ededed",
  //   mainColor: "#0C1618",
  //   passiveColor: "#335b63",
  //   cancelColor: "#333025",
  // });
  return (
    <MyModal visible={props.visible}>
      <View style={{ flex: 1, marginTop: 50 }}>
        <Label>Tema Ayarları</Label>
        <ColorButton onPress={handleChangeMainColor}>
          Ana Rengi Ayarla
          <Text style={{ color: colors.mainColor }}>@</Text>
        </ColorButton>
        <ColorButton onPress={handleChangePassiveColor}>
          Pasif Rengi Ayarla
          <Text style={{ color: colors.passiveColor }}>@</Text>
        </ColorButton>
        <ColorButton onPress={handleChangeBackColor}>
          Arkaplan Rengi Ayarla
          <Text style={{ color: colors.backColor }}>@</Text>
        </ColorButton>
        <ColorButton onPress={handleChangeCancelColor}>
          İptal Rengi Ayarla
          <Text style={{ color: colors.cancelColor }}>@</Text>
        </ColorButton>
        <ColorButton onPress={handleApplyLightTheme}>
          Varsayılan Açık Tema Ayarlarını Uygula
        </ColorButton>
        <ColorButton onPress={handleApplyDarkTheme}>
          Varsayılan Koyu Tema Ayarlarını Uygula
        </ColorButton>
        <ColorButton cancel onPress={handleCloseSettings}>Geri</ColorButton>
        <ColorPicker
          visible={colorPickRequested}
          onSelect={handleColorSelect}
        />
      </View>
    </MyModal>
  );
};
