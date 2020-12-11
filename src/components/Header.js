import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const Header = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>PASS-MAS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    height: 50,
//    backgroundColor: colorTheme.backDarkerColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Header;
