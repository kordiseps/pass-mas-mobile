import React from "react";
import styled from "styled-components/native";

const Div = styled.View`
  width: 90%;
  padding: 5px;
  border: 1px solid red;
  margin: 2% 5% 2% 5%;
  border-radius: 10px;
`;
const Input = styled.TextInput`
  color: #000;
  text-align: left;
  font-size: 16px;
`;
export default TextBox = (props) => (
  <Div>
    <Input
      secureTextEntry={props.isSecure}
      placeholder={props.placeholder}
      onChangeText={ props.setText}
      keyboardType={props.isNumberOnly? "number-pad":"default"}
    >
      {props.text}
    </Input>
  </Div>
);
