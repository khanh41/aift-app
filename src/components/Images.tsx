import React from "react";
import { Image, StyleSheet } from "react-native";

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
  value = `https://firebasestorage.googleapis.com/v0/b/aift-b7b2c.appspot.com/o/${value}.jpg?alt=media`;
  return <Image source={{ uri: value }} style={styles.exercise} />;
}
