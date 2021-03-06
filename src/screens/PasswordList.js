import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import styled from "styled-components/native";
import { getPasswords, savePassword } from "../contexts/dbContext";
import { synchronize } from "../helpers/synchronizer";
import ColorButton from "../components/ColorButton";
import ListItem from "../components/ListItem";
import AddPassword from "./AddPassword";
import Loading from "../components/Loading";

const Div = styled.View`
  flex: 1;
`;

export default PasswordList = (props) => {
  const [addRequested, setAddRequested] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [passwordList, setPasswordList] = useState([]);

  async function loadPasswords() {
    setLoading(true);
    let passwords = await getPasswords();
    setPasswordList(passwords);
    setLoading(false);
  }

  useEffect(() => {
    loadPasswords();
  }, []);

  const handleNew = () => {
    setAddRequested(true);
  };
  const handleAdd = async (app, username, password, color) => {
    savePassword(app, username, password, color)
      .then(loadPasswords)
      .then(() => setAddRequested(false));
  };
  const handleCancel = () => {
    setAddRequested(false);
  };

  return (
    <Div>
      {isLoading ? (
        <Loading size={150} />
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={passwordList}
            renderItem={({ item }) => <ListItemContainer data={item} />}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={renderSeparator}
          />
          <AddPassword
            visible={addRequested}
            onAdd={handleAdd}
            onCancel={handleCancel}
          />
          <ColorButton onPress={handleNew}>Yeni Ekle</ColorButton>
        </View>
      )}
    </Div>
  );
};

class ListItemContainer extends React.PureComponent {
  render() {
    return (
      <ListItem
        app={this.props.data.app}
        username={this.props.data.username}
        password={this.props.data.password}
        color={this.props.data.color}
      />
    );
  }
}

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
