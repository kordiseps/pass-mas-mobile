import React, { useContext } from "react";
import styled from "styled-components/native";
import { ColorContext } from "../../contexts/ColorContext";

const Div = styled.View`
  width: 90%;
  padding: 5px;
  border: 2px solid purple;
  margin: 2% 5% 2% 5%;
  border-radius: 10px;
`;
export default BorderedDiv = (props) => {
  const { colors } = useContext(ColorContext);
  return <Div style={{ borderColor: colors.mainColor }}>{props.children}</Div>;
};
