import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { ColorContext } from "../contexts/ColorContext";
import BorderedDiv from "./BorderedDiv";

const Div = styled.View`
  width:100%;
`;
const Span = styled.Text`
  color: #000;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;
export default ColorButton = (props) => {
  const { colors } = useContext(ColorContext);
  const textColor =
    props.color !== undefined
      ? props.color
      : props.cancel
      ? colors.cancelColor
      : colors.mainColor;
  return (
    <Div>
      <TouchableOpacity onPress={props.onPress}>
        <BorderedDiv>
          <Span style={{ color: textColor }}>{props.children}</Span>
        </BorderedDiv>
      </TouchableOpacity>
    </Div>
  );
};
