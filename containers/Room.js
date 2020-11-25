import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import { useNavigation } from "@react-navigation/core";

export default function Room() {
  //   const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>This is the Room component</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
