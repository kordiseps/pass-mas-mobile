import React, { useContext } from "react";
import styled from "styled-components/native";
import { ColorContext } from "../contexts/ColorContext";
import BorderedDiv from "./BorderedDiv";

const Input = styled.TextInput`
  text-align: left;
  font-size: 16px;
  padding-left: 5%;
  padding-right: 5%;
`;
export default TextBox = (props) => {
  const { colors } = useContext(ColorContext);

  return (
    <BorderedDiv>
      <Input
        secureTextEntry={props.isSecure}
        placeholder={props.placeholder}
        onChangeText={props.setText}
        keyboardType={props.isNumberOnly ? "number-pad" : "default"}
        style={{ color: colors.mainColor }}
        placeholderTextColor={colors.passiveColor}
      >
        {props.text}
      </Input>
    </BorderedDiv>
  );
};
