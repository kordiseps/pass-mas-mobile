import React, { useEffect, useState } from "react";
import ColorButton from "../components/ColorButton";
import { SettingsColorTheme } from "./SettingsColorTheme";
import { SettingsPassword as SettingsPinCode } from "./SettingsPinCode";
import { SettingsRemoveUserData } from "./SettingsRemoveUserData";
import { SettingsSynchronize } from "./SettingsSynchronize";
import MyModal from "../components/MyModal";

export const Settings = (props) => {
  const [passwordSettings, setPasswordSettings] = useState(false);
  const [synchronizeSettings, setSynchronizeSettings] = useState(false);
  const [removeUserDataSettings, setRemoveUserDataSettings] = useState(false);
  const [colorThemeSettings, setColorThemeSettings] = useState(false);
  useEffect(() => {}, []);
  const handleRemoveUserDataSettings = () => {
    setRemoveUserDataSettings(true);
  };
  const handleUserPasswordSettings = () => {
    setPasswordSettings(true);
  };
  const handleSynchronizeSettings = () => {
    setSynchronizeSettings(true);
  };
  const handleColorThemeSettings = () => {
    setColorThemeSettings(true);
  };
  const handleCloseSettings = () => {
    props.onClose();
  };

  return (
    <MyModal visible={props.visible}>
      <ColorButton onPress={handleUserPasswordSettings}>
        Kullanıcı Pin Kodu Ayarları
      </ColorButton>
      <ColorButton onPress={handleColorThemeSettings}>
        Tema Ayarları
      </ColorButton>
      <ColorButton onPress={handleSynchronizeSettings}>
        Senkronizasyon Ayarları
      </ColorButton>
      <ColorButton onPress={handleRemoveUserDataSettings}>
        Kullanıcı Veri Silme Ayarları
      </ColorButton>
      <ColorButton cancel onPress={handleCloseSettings}>Ayarları kapat</ColorButton>
      <SettingsPinCode
        visible={passwordSettings}
        onClose={() => {
          setPasswordSettings((o) => !o);
        }}
      />
      <SettingsSynchronize
        visible={synchronizeSettings}
        onClose={() => {
          setSynchronizeSettings((o) => !o);
        }}
      />
      <SettingsRemoveUserData
        visible={removeUserDataSettings}
        onClose={() => {
          setRemoveUserDataSettings((o) => !o);
        }}
      />
      <SettingsColorTheme
        visible={colorThemeSettings}
        onClose={() => {
          setColorThemeSettings((o) => !o);
        }}
      />
    </MyModal>
  );
};
