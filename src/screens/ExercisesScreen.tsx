import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Exercise } from "../components/Images";
import ExerciseService, {
  IExerciseResponse,
} from "../services/ExerciseService";
import { IExercise } from "../types/ResponseType";
import { RootTabScreenProps } from "../types/types";

export default function ExercisesScreen({
  navigation,
}: RootTabScreenProps<"Exercises">) {
  const [exerciseList, setExerciseList] = useState<IExercise[]>([]);
  const [hasError, setErrorFlag] = useState(false);

  const fetchAllExercises = async () => {
    try {
      const response = await ExerciseService.getAll();
      if (response.status === 200) {
        const data: IExerciseResponse = response.data;
        setExerciseList(data["data"]);
        return;
      } else {
        console.log("erorr1");
        throw new Error("Failed to fetch users");
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Data fetching cancelled");
      } else {
        console.log(error);
        setErrorFlag(true);
      }
    }
  };

  useEffect(() => {
    fetchAllExercises();
  }, []);

  const getExercisesName = () => {
    return (
      <View style={styles.row}>
        {exerciseList.map((value: IExercise) => (
          <TouchableOpacity
            key={value.name}
            onPress={() => navigation.navigate("DoExerciseStart", value)}
            style={[styles.button, styles.selected]}
          >
            {Exercise(value.name)}
            <Text style={[styles.buttonLabel, styles.selectedLabel]}>
              {value.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  return <View style={{ padding: 10, flex: 1 }}>{getExercisesName()}</View>;
}

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
