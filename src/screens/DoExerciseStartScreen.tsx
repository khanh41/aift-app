import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import EditScreenInfo from "../components/ExerciseInfor";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types/types";

export default function DoExerciseStartScreen({
  route,
  navigation,
}: RootStackScreenProps<"DoExerciseStart">) {
  const [introSentence, setIntroSentence] = useState("");

  const step = {
    name: route.params.name,
    numberStep: 2,
    currentStep: 1,
  };

  const infor =
    "Aa pushup isn't just a chest exercise. It's a position of full body tension (or it should be). So start in a good plank: shoulders squeezed, glutes tight, abs tight. Upload your form and we'll fix it to make sure you're in the right place.";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Information</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path={infor} />

      <View style={styles.paddingButton} />

      <Button
        icon="image-plus"
        mode="contained"
        color="#88c292"
        style={styles.buttonStart}
        onPress={() => navigation.navigate("DoExerciseInprocess", step)}
      >
        By Image
      </Button>

      <View style={styles.paddingButton} />

      <Button
        icon="video-plus"
        mode="contained"
        color="#88c292"
        style={styles.buttonStart}
        onPress={() => navigation.navigate("NotFound")}
      >
        By Video
      </Button>

      <View style={styles.paddingButton} />

      <Button
        icon="webcam"
        mode="contained"
        color="#88c292"
        style={styles.buttonStart}
        onPress={() => navigation.navigate("NotFound")}
      >
        Live Camera
      </Button>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "80%",
  },
  buttonStart: {
    width: 150,
  },

  paddingButton: {
    paddingTop: 20,
  },
});
