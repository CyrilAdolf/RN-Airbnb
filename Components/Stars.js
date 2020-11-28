import React from "react";
import { StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function Stars({ item }) {
  return (
    <View style={styles.container}>
      <FontAwesome
        name="star"
        size={24}
        color={item.ratingValue >= 1 ? "gold" : "grey"}
      />
      <FontAwesome
        name="star"
        size={24}
        color={item.ratingValue >= 2 ? "gold" : "grey"}
      />
      <FontAwesome
        name="star"
        size={24}
        color={item.ratingValue >= 3 ? "gold" : "grey"}
      />
      <FontAwesome
        name="star"
        size={24}
        color={item.ratingValue >= 4 ? "gold" : "grey"}
      />
      <FontAwesome
        name="star"
        size={24}
        color={item.ratingValue >= 5 ? "gold" : "grey"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
});
