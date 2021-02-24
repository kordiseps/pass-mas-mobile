import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import styled from "styled-components/native";
import TextBox from "../styledComponents/TextBox";
import Label from "../styledComponents/Label";
import colorsData from "../../dbContext/colors-tr.json";
import { SearchBar } from "react-native-elements"; 
import BorderedDiv from "../styledComponents/BorderedDiv";

const Div = styled.View`
  flex: 1;
`;

export default ColorPicker = (props) => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    setColors(colorsData);
  }, []);

  const handleSearch = (val) => {
    setColors(
      colorsData.filter((x) => x.name.toLowerCase().includes(val.toLowerCase()))
    );
  };

  const handleSelect = (val) => {
    setColors(colorsData);
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
          //marginLeft: "14%",
        }}
      />
    );
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <Div>
        <BorderedDiv>
          <TextBox placeholder="Renk Ara" setText={handleSearch} />
        </BorderedDiv>
        <FlatList
          data={colors}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item.code)}>
              <ListItem id={item.id} value={item.code} name={item.name} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={renderSeparator}
        />
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
