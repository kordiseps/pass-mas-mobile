import React, { useEffect, useState } from "react";
import Choise from "../components/choise";
import Label from "../components/label";
import Loading from "../components/loading";
import MyModal from "../components/my-modal";
import { saveUser } from "../contexts/db-context";
import { login } from "../helpers/api-connector";
import { initialize } from "../helpers/initializer";
import { downloadDataAndSave } from "../helpers/synchronizer";

export const Restore = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const [userName, setUserName] = useState("");
  useEffect(() => {}, []);
  const handleSubmit = async () => {
    var loginResponse = await login(userName, pinCode);
    if (loginResponse.isSuccess) {
      setLoading(true);
      await initialize();
      await saveUser(userName, pinCode);
      var downloadDataAndSaveResponse = await downloadDataAndSave(
        loginResponse.token
      );
      if (downloadDataAndSaveResponse) {
        alert("Tüm veriler alındı");
        setLoading(false);
        props.onRestore();
      } else {
        alert("Veriler alınırken hata oluştu.");
        setLoading(false);
      }
    } else {
      alert(JSON.stringify(loginResponse.errors, null, 2));
    }
  };

  const handleCancel = () => {
    props.onCancelRestore();
  };

  return (
    <MyModal visible={props.visible}>
      <Label>Hesaba giriş yap</Label>
      <TextBox text={userName} setText={setUserName} />
      <TextBox isSecure isNumberOnly text={pinCode} setText={setPinCode} />
      {isLoading ? (
        <Loading size={150} />
      ) : (
        <Choise
          onOk={handleSubmit}
          Ok="Giriş Yap"
          onCancel={handleCancel}
          Cancel="Vazgeç"
        />
      )}
    </MyModal>
  );
};
