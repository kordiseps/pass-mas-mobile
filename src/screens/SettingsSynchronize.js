import React, { useEffect, useState } from "react";
import { View } from "react-native";
import ColorButton from "../components/ColorButton";
import Label from "../components/Label";
import Loading from "../components/Loading";
import MyModal from "../components/MyModal";

export const SettingsSynchronize = (props) => {
  const [isSynchronizing, setSynchronizing] = useState(false);
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
  const handleSynchronizee = async () => {
    console.log("senkronizasyon isteği geldi");
    setSynchronizing(true);
    await synchronize();
    setSynchronizing(false);
  };

  return (
    <MyModal visible={props.visible}>
      <Label>Senkronizasyon Ayarları</Label>
      <ColorButton onPress={handleSynchronize}>
        Tüm verileri sunucuyla senkronize et
      </ColorButton>
      <ColorButton onPress={handleDeleteFromServerAndSendData}>
        Sunucudaki tüm verileri sil, cihazdaki verileri sunucuya gönder
      </ColorButton>
      <ColorButton cancel onPress={handleCloseSettings}>
        Geri
      </ColorButton>
      {/* {isSynchronizing ? (
            <Loading passiveColor />
          ) : (
            <>
              <ColorButton color="#ff051a" onPress={handleSynchronize}>
                Senkronize Et
              </ColorButton>
            </>
          )} */}
    </MyModal>
  );
};
