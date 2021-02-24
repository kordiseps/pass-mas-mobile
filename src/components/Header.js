import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const Header = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>PASS-MAS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    height: 50,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text:{
    fontWeight:'bold',
    fontSize:24
  }
});

export default Header;
