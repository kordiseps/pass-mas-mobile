import React, { useContext, useEffect, useState } from "react";
import { View, Modal, Text, TouchableOpacity, FlatList } from "react-native";
import styled from "styled-components/native";
import TextBox from "../components/TextBox";
import colorsData from "../constants/colorList.json"; 
import { ColorContext } from "../contexts/ColorContext";

const Div = styled.View`
  flex: 1;
`;

export default ColorPicker = (props) => {
  const { colors } = useContext(ColorContext);
  const [color, setColor] = useState([]);

  useEffect(() => {
    setColor(colorsData);
  }, []);

  const handleSearch = (val) => {
    setColor(
      colorsData.filter((x) => x.name.toLowerCase().includes(val.toLowerCase()))
    );
  };

  const handleSelect = (val) => {
    setColor(colorsData);
    props.onSelect(val);
  };
  const ITEM_HEIGHT = 50;

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <Div style={{ backgroundColor: colors.backColor }}>
        <Div style={{ flex: 1, marginTop: 50 }}>
          <TextBox placeholder="Renk Ara" setText={handleSearch} />
          <FlatList
            data={color}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelect(item.code)}>
                <ListItem id={item.id} value={item.code} name={item.name} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={renderSeparator}
          />
        </Div>
      </Div>
    </Modal>
  );
};

class ListItem extends React.PureComponent {
  render() {
    return (
      <View
        key={this.props.id.toString()}
        style={{ height: 35, justifyContent: "center" }}
      >
        <Text style={{ color: this.props.value, marginLeft: 15 }}>
          {this.props.name}
        </Text>
      </View>
    );
  }
}
