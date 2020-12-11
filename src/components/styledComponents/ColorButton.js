import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Div = styled.View`
  width: 90%;
  padding: 5px;
  border: 2px solid red;
  margin: 2% 5% 2% 5%;
  border-radius: 10px;
`;
const Span = styled.Text`
  color: #000;
  text-align: center;
  font-size: 16px;
  font-weight:bold;
`;
export default ColorButton = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <Div style={{borderColor:props.color}}>
      <Span style={{color:props.color}}>{props.children}</Span>
    </Div>
  </TouchableOpacity>
);
