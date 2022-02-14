import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import EditScreenInfo from "../components/ExerciseInfor";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types/types";

export default function DoExerciseStartScreen({
  route,
  navigation,
}: RootStackScreenProps<"DoExerciseStart">) {
  const introSentence: string = route.params.description;

  const step = {
    name: route.params.name,
    numberStep: route.params.numStep,
    currentStep: 1,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Information</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path={introSentence} />

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
        onPress={() => navigation.navigate("DoExerciseInprocessVideo", { name: route.params.name, })}
      >
        By Video
      </Button>

      <View style={styles.paddingButton} />

      <Button
        icon="webcam"
        mode="contained"
        color="#88c292"
        style={styles.buttonStart}
        onPress={() => navigation.navigate("DoExerciseInprocessStream", { name: route.params.name })}
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
