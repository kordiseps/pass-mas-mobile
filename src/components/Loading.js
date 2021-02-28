import React, { useContext } from "react";

import {
  //BallIndicator,
  BarIndicator,
  //DotIndicator,
  //MaterialIndicator,
  //PacmanIndicator,
  // PulseIndicator,
  SkypeIndicator,
  // UIActivityIndicator,
  // WaveIndicator,
} from "react-native-indicators";

import { ColorContext } from "../contexts/ColorContext";

export default Loading = (props) => {
  let size = 50;
  if (props.size) {
    size = props.size;
  }
  const { colors } = useContext(ColorContext);
  return (
    <SkypeIndicator
      color={props.passiveColor ? colors.passiveColor : colors.mainColor}
      size={size}
    />
  );
};
