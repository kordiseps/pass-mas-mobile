import React, { useContext } from "react";
import { Modal } from "react-native";
import styled from "styled-components/native";
import { ColorContext } from "../contexts/color-context";

const Div = styled.View`
  flex: 1;
`;

export default MyModal = (props) => {
  const { colors } = useContext(ColorContext);
  return (
    <Modal visible={props.visible} animationType="slide">
      <Div style={{ backgroundColor: colors.backColor }}>
        <Div style={{ marginTop: 50 }}>{props.children}</Div>
      </Div>
    </Modal>
  );
};
