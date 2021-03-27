import React, { useEffect, useState } from "react";
import ColorButton from "../components/color-button";
import Label from "../components/label";
import Loading from "../components/loading";
import MyModal from "../components/my-modal";
import { synchronize } from "../helpers/synchronizer";

export const SettingsSynchronize = (props) => {
  const [isSynchronizing, setSynchronizing] = useState(false);
  useEffect(() => {}, []);
  const handleSynchronize = async () => {
    setSynchronizing(true);
    await synchronize();
    setSynchronizing(false);
  };

  const handleCloseSettings = () => {
    props.onClose();
  };

  return (
    <MyModal visible={props.visible}>
      <Label>Senkronizasyon Ayarları</Label>
      {isSynchronizing ? (
        <Loading passiveColor />
      ) : (
        <>
          <ColorButton onPress={handleSynchronize}>
            Tüm verileri sunucuyla senkronize et
          </ColorButton>

          <ColorButton cancel onPress={handleCloseSettings}>
            Geri
          </ColorButton>
        </>
      )}
    </MyModal>
  );
};
