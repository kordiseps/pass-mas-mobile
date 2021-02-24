import React from "react";
import styled from "styled-components/native";
import BorderedDiv from "./BorderedDiv";

const Span = styled.Text`
  color: #000;
  text-align: center;
  font-size: 16px;
`;
export default Label = (props) => {
  return (
    <BorderedDiv>
      <Span>{props.children}</Span>
    </BorderedDiv>
  );
};
