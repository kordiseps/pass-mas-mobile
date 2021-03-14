import React, { useState } from "react";
import { TouchableOpacity, Clipboard } from "react-native";
import styled from "styled-components/native";
import PasswordDetail from "../screens/password-detail";

const Div = styled.View`
  width: 100%;
  margin: 1% 0% 1% 0%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 60px;
`;
const Text = styled.Text`
  color: white;
  text-align: left;
  font-size: 16px;
`;

export default ListItem = (props) => {
  const [editRequested, setEditRequested] = useState(false);
  const handleOnPress = () => {
    Clipboard.setString(props.username);
    alert("Kullanıcı Adı Kopyalandı");
  };
  const handleOnLongPress = () => {
    Clipboard.setString(props.password);
    alert("Şifre Kopyalandı");
  };
  const handleOnLongPressOnApp = () => {
    setEditRequested(true);
  };
  const handleCancel = () => {
    setEditRequested(false);
  };
  const handleSave = (app, username, password, color) => {
    props.onUpdate(props.id,app, username, password, color)
    setEditRequested(false);
  };
  const handleDelete = () => {
    props.onDelete()
    setEditRequested(false);
  };
  return (
    <Div>
      <TouchableOpacity onLongPress={handleOnLongPressOnApp}>
        <Text style={{ color: props.color, marginHorizontal: 15 }}>
          {props.app}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleOnPress} onLongPress={handleOnLongPress}>
        <Text style={{ color: props.color, marginHorizontal: 15 }}>
          {props.username}
        </Text>
      </TouchableOpacity>
      <PasswordDetail
        data={props}
        visible={editRequested}
        onCancel={handleCancel}
        onUpdate={handleSave}
        onDelete={handleDelete}
      />
    </Div>
  );
};
