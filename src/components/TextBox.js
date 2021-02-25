import React from "react";
import styled from "styled-components/native";
import BorderedDiv from "./BorderedDiv";

const Input = styled.TextInput`
  color: #000;
  text-align: left;
  font-size: 16px;
`;
export default TextBox = (props) => (
  <BorderedDiv>
    <Input
      secureTextEntry={props.isSecure}
      placeholder={props.placeholder}
      onChangeText={props.setText}
      keyboardType={props.isNumberOnly ? "number-pad" : "default"}
    >
      {props.text}
    </Input>
  </BorderedDiv>
);