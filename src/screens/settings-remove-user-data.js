import React, { useEffect } from "react"; 
import ColorButton from "../components/color-button";
import Label from "../components/label";
import MyModal from "../components/my-modal";
import { DropAccount } from "../contexts/db-context";
import { DropAccountFromServer } from "../helpers/api-connector";

export const SettingsRemoveUserData = (props) => {
  useEffect(() => {}, []);
  async function handleRemoveAccountFromDevice(){
    await DropAccount()
    props.onDropAccount()
  };
  async function handleRemoveAccountFromServerAndDevice() {
    var result = await DropAccountFromServer()
    if (result) {
      await DropAccount() 
      props.onDropAccount()
    }
    else {
      alert("Sunucudan veriler silinemedi")
    }
  };
  function handleCloseSettings(){
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
