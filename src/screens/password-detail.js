import React, { useContext, useState } from "react";
import TextBox from "../components/text-box";
import Label from "../components/label";
import ColorPicker from "./color-picker";
import ColorButton from "../components/color-button";
import { ColorContext } from "../contexts/color-context";
import Loading from "../components/loading";
import Choise from "../components/choise";
import MyModal from "../components/my-modal";
import Confirm from "../components/confirm";

export default PasswordDetail = (props) => {
  const [deleteConfirmRequested, setDeleteConfirmRequested] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [app, setApp] = useState(props.data.app);
  const [username, setUserName] = useState(props.data.username);
  const [password, setPassword] = useState(props.data.password);
  const [colorPickRequested, setColorPickRequested] = useState(false);
  const { colors } = useContext(ColorContext);
  const [color, setColor] = useState(props.data.color);

  function reset() {
    setApp("");
    setUserName("");
    setPassword("");
    setColor(colors.mainColor);
  }

  const handleSubmit = () => {
    if (app !== "" && username !== "" && password !== "" && color !== "") {
      setIsSubmitting(true);
      if (
        app === props.data.app &&
        username === props.data.username &&
        password === props.data.password &&
        color === props.data.color
      ) {
        handleCancel();
      } else {
        props.onUpdate(app, username, password, color);
        setIsSubmitting(false);
      }
    } else {
      alert("Tüm alanları doldurun");
    }
  };

  const handleCancel = () => {
    props.onCancel();
    setIsSubmitting(false);
  };

  const handleDelete = () => {
    setDeleteConfirmRequested(true);
  };
  const onDeleteCancelled = () => {
    setDeleteConfirmRequested(false);
  };
  const onDeleteConfirmed = () => {
    setDeleteConfirmRequested(false);
    props.onDelete();
    setIsSubmitting(false);
  };

  const handleColorSelect = (val) => {
    setColor(val);
    setColorPickRequested(false);
  };

  const handleColorPickRequested = () => {
    setColorPickRequested(true);
  };

  return (
    <MyModal visible={props.visible}>
      <Label>Düzenle</Label>
      <ColorButton cancel onPress={handleDelete}>
        Sil
      </ColorButton>
      <TextBox placeholder="Uygulama" text={app} setText={setApp} />
      <TextBox
        placeholder="Kullanıcı Adı"
        text={username}
        setText={setUserName}
      />
      <TextBox
        placeholder="Parola"
        text={password}
        setText={setPassword}
        isSecure
      />
      <ColorButton color={color} onPress={handleColorPickRequested}>
        Renk Seç
      </ColorButton>
      <ColorPicker visible={colorPickRequested} onSelect={handleColorSelect} />
      {isSubmitting ? (
        <Loading />
      ) : (
        <Choise
          onOk={handleSubmit}
          Ok="Kaydet"
          onCancel={handleCancel}
          Cancel="Vazgeç"
        />
      )}

      <Confirm
        visible={deleteConfirmRequested}
        message={`${app} silinecektir. Onaylıyor musunuz?`}
        onOk={onDeleteConfirmed}
        Ok="Onayla"
        onCancel={onDeleteCancelled}
        Cancel="Vazgeç"
      />
    </MyModal>
  );
};
//   <PasswordInpts
//     app={app}
//     setApp={setApp}
//     username={username}
//     setUserName={setUserName}
//     password={password}
//     setPassword={setPassword}
//     color={color}
//     handleColorPickRequested={handleColorPickRequested}
//     colorPickRequested={colorPickRequested}
//     handleColorSelect={handleColorSelect}
//   />
// const PasswordInpts = (props) => {
//   return (
//     <>
//       <TextBox placeholder="Uygulama" text={props.app} setText={props.setApp} />
//       <TextBox
//         placeholder="Kullanıcı Adı"
//         text={props.username}
//         setText={props.setUserName}
//       />
//       <TextBox
//         placeholder="Parola"
//         text={props.password}
//         setText={props.setPassword}
//         isSecure
//       />
//       <ColorButton color={props.color} onPress={props.handleColorPickRequested}>
//         Renk Seç
//       </ColorButton>
//       <ColorPicker
//         visible={props.colorPickRequested}
//         onSelect={props.handleColorSelect}
//       />
//     </>
//   );
// };
