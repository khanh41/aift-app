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

export const exerciseList = [
  "Push Up",
  "Squat",
  "Planks",
  "Bird Dog",
  "Lying Hip Raises",
  "Lying Side Hip Raises",
  "Leg Raises",
  "Fire Hydrant",
];

export function Exercise(value: string) {
  value = value.toLowerCase().split(" ").join("");
  value = `https://firebasestorage.googleapis.com/v0/b/aift-b7b2c.appspot.com/o/${value}.jpg?alt=media`;
  return <Image source={{ uri: value }} style={styles.exercise} />;
}

// export const PushUpExercise = () => (
//   <Image source={require("../assets/push_up.jpg")} style={styles.exercise} />
// );

// export const SquashExercise = () => (
//   <Image source={require("../assets/squash.jpg")} style={styles.exercise} />
// );

// export const PlankExercise = () => (
//   <Image source={require("../assets/plank.jpeg")} style={styles.exercise} />
// );

// export const BirdDogExercise = () => (
//   <Image source={require("../assets/birddog.jpg")} style={styles.exercise} />
// );
// export const LyingHipRaises = () => (
//   <Image
//     source={require("../assets/lying_hip_raises.jpg")}
//     style={styles.exercise}
//   />
// );
// export const LyingSideHipRaisesExercise = () => (
//   <Image
//     source={require("../assets/lying_side_hip_raises.jpg")}
//     style={styles.exercise}
//   />
// );
// export const LegRaisesExercise = () => (
//   <Image source={require("../assets/leg_raises.jpg")} style={styles.exercise} />
// );
// export const FireHydrantExercise = () => (
//   <Image
//     source={require("../assets/FireHydrant.png")}
//     style={styles.exercise}
//   />
// );
