import React, { useContext, useEffect, useState } from "react";
import { View,  Text, TouchableOpacity, FlatList } from "react-native";
import styled from "styled-components/native";
import TextBox from "../components/TextBox";
import colorsData from "../constants/colorList.json";
import { ColorContext } from "../contexts/ColorContext";
import MyModal from "../components/MyModal";

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
    <MyModal visible={props.visible}>
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
    </MyModal>
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
