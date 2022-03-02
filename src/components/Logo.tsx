import React from "react";
import { TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";

type Props = {
  goBack: () => void;
};

const LogoButton = ({ goBack }: Props) => (
  <TouchableOpacity onPress={goBack} style={styles.container}>
    <Image style={styles.image} source={require("../assets/logo.png")} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    paddingLeft: Dimensions.get("window").width / 2.23,
  },
  image: {
    width: Dimensions.get("window").width / 10,
    height: Dimensions.get("window").width / 10,
    borderRadius: 100,
    borderWidth: 3,
  },
});

export default LogoButton;
