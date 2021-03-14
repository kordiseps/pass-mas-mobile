import React from "react";
import Label from "./label";
import MyModal from "./my-modal";
import Choise from "./choise";

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
