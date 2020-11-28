import React from "react";
import { Image } from "react-native";

export default function Logo() {
  return (
    <Image
      style={{ width: 40, height: 40 }}
      source={require("../assets/logo.png")}
    />
  );
}
