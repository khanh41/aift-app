import React from "react";
import { Image, StyleSheet } from "react-native";
import { firebaseImageUrl, replaceText } from "../constants/API";

export const Logo = () => (
  <Image
    source={require("../assets/logo.png")}
    style={{
      width: 128,
      height: 128,
      marginBottom: 12,
    }}
  />
);

const styles = StyleSheet.create({
  exercise: {
    width: "100%",
    height: "80%",
  },
});

export function Exercise(value: string) {
  value = value.toLowerCase().split(" ").join("");
  value = firebaseImageUrl.replace(replaceText, value);
  return <Image source={{ uri: value }} style={styles.exercise} />;
}
