import React from "react";
import styled from "styled-components/native";
import ColorButton from "./color-button";

const Div = styled.View`
  width: 100%;
  margin-top: 3%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const SmallDiv = styled(Div)`
  width: 50%;
`;
export default Choise = (props) => {
  return (
    <Div>
      <SmallDiv>
        <ColorButton cancel onPress={props.onCancel}>
          {props.Cancel}
        </ColorButton>
      </SmallDiv>
      <SmallDiv>
        <ColorButton onPress={props.onOk}>{props.Ok}</ColorButton>
      </SmallDiv>
    </Div>
  );
};
