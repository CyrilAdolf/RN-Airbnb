import React from "react";
import { Image } from "react-native";

export default function Logo() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require("../assets/logo.png")}
    />
  );
}
