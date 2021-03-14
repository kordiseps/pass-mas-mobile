import React, { useEffect, useState } from "react";
import { View } from "react-native";
import ColorButton from "../components/color-button";
import Label from "../components/label";
import Loading from "../components/loading";
import MyModal from "../components/my-modal";
import { synchronize } from "../helpers/synchronizer";

export const SettingsSynchronize = (props) => {
  const [isSynchronizing, setSynchronizing] = useState(false);
  useEffect(() => {}, []);
  const handleSynchronize = () => {
    //console.log("handleSynchronize");
    handleSynchronizee()
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
