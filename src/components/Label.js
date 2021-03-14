import React, { useContext } from "react";
import styled from "styled-components/native";
import { ColorContext } from "../contexts/color-context";
import BorderedDiv from "./bordered-div";

const Span = styled.Text`
  text-align: center;
  font-size: 24px;
  font-weight:800;
`;
export default Label = (props) => {  
  const { colors } = useContext(ColorContext);
  return (
    <BorderedDiv>
      <Span style={{color:colors.mainColor}}>{props.children}</Span>
    </BorderedDiv>
  );
};
