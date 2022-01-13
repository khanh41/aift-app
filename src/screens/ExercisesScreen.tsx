import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Exercise, exerciseList } from "../components/Images";
import { RootTabScreenProps } from "../types/types";

interface PreviewInterface {
  navigation: any
  label: string;
  values: string[];
  selectedValue: string;
  setSelectedValue: any;
}

export default function ExercisesScreen({
  navigation,
}: RootTabScreenProps<"Exercises">) {
  const [alignContent, setAlignContent] = useState("flex-start");

  return (
    <PreviewLayout
      navigation={navigation}
      label="alignContent"
      selectedValue={alignContent}
      values={exerciseList}
      setSelectedValue={setAlignContent}
    ></PreviewLayout>
  );
}

const PreviewLayout = ({
  navigation,
  label,
  values,
  selectedValue,
  setSelectedValue,
}: PreviewInterface) => (
  <View style={{ padding: 10, flex: 1 }}>
    <Text>Sort</Text>
    <View style={styles.row}>
      {values.map((value) => (
        <TouchableOpacity
          key={value}
          onPress={() => navigation.navigate("DoExerciseStart", {name: value})}
          style={[styles.button, selectedValue === value && styles.selected]}
        >
          {Exercise(value)}
          <Text
            style={[
              styles.buttonLabel,
              selectedValue === value && styles.selectedLabel,
            ]}
          >
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#7CA9DE",
    backgroundColor: "oldlace",
    marginHorizontal: "3%",
    marginBottom: 20,
    width: "44%",
    height: 100,
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    backgroundColor: "coral",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "coral",
  },
  selectedLabel: {
    color: "white",
  },
});
