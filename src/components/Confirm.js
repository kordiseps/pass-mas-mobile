import React from "react";
import Label from "./Label";
import MyModal from "./MyModal";
import Choise from "./Choise";

export default Confirm = (props) => {
  return (
    <MyModal visible={props.visible}>
      <Label>{props.message}</Label>
      <Choise
        onOk={props.onOk}
        Ok={props.Ok}
        onCancel={props.onCancel}
        Cancel={props.Cancel}
      />
    </MyModal>
  );
};
