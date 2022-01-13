import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Image,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { View } from "../components/Themed";
import { RootStackScreenProps } from "../types/types";
import * as ImagePicker from "expo-image-picker";
import { firebaseImageUrl, replaceText } from "../constants/API";
import { FontAwesome } from "@expo/vector-icons";
import StepIndicator from "react-native-step-indicator";

export default function DoExerciseInprocessScreen({
  route,
  navigation,
}: RootStackScreenProps<"DoExerciseInprocess">) {
  const showImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      setErrorText("");
    }
  };

  const starComponent = (numStar: number) => {
    let starOutput = [];
    for (let index = 0; index < numStar; index++) {
      starOutput.push(<FontAwesome name="star" size={30} color="yellow" />);
    }

    for (let index = numStar; index < 5; index++) {
      starOutput.push(<FontAwesome name="star" size={30} color="black" />);
    }

    return starOutput;
  };

  const [currentStep, setCurrentStep] = useState<number>(
    route.params.currentStep
  );
  const [numberStep, setNumberStep] = useState<number>(route.params.numberStep);
  const [pickedImagePath, setPickedImagePath] = useState<string>("");
  const [isSubmit, setIsSubmit] = useState<boolean>(true);
  const [errorText, setErrorText] = useState<string>("");
  const [numStar, setNumStar] = useState<number>(0);
  const [resultImage, setResultImage] = useState<string>("");

  let value = route.params.name;
  value = value.toLowerCase().split(" ").join("");
  const [imageUrl, setImageUrl] = useState(
    firebaseImageUrl.replace(replaceText, value + currentStep)
  );

  useEffect(() => {
    setIsSubmit(true);
    setImageUrl(firebaseImageUrl.replace(replaceText, value + currentStep));
    setPickedImagePath("");
  }, [currentStep]);

  const submitPress = () => {
    if (pickedImagePath != "") {
      setIsSubmit(false);
      setErrorText("");

      // Call api and get link image, number star
      setResultImage(pickedImagePath);
      setNumStar(3);
    } else {
      setErrorText("Please choose a image");
    }
  };

  const getLayout = () => {
    if (isSubmit)
      return (
        <View>
          <StepIndicator
            stepCount={numberStep}
            currentPosition={currentStep - 1}
          />
          <View style={styles.containerImage}>
            <Image source={{ uri: imageUrl }} style={styles.imageArea} />
            <Text style={{ paddingTop: 20 }}>Your Image:</Text>

            <TouchableOpacity
              key={value}
              onPress={showImagePicker}
              style={styles.imageArea}
            >
              {pickedImagePath !== "" ? (
                <Image
                  source={{ uri: pickedImagePath }}
                  style={{ width: "100%", height: 150 }}
                />
              ) : (
                <Text style={styles.buttonLabel}>Choose Image</Text>
              )}
            </TouchableOpacity>
            {errorText != "" && (
              <Text style={styles.errorText}>{errorText}</Text>
            )}
          </View>
          <View style={styles.fixToText}>
            <Button title="Submit" color="#6ec965" onPress={submitPress} />
          </View>
        </View>
      );

    return (
      <View>
        <View style={styles.containerImage}>
          <Image source={{ uri: resultImage }} style={styles.imageArea} />
          <View style={styles.starIcon}>{starComponent(numStar)}</View>
          <View style={styles.fixToText}>
            {currentStep >= numberStep ? (
              <Button
                title="Finish"
                color="#e0c475"
                onPress={() => navigation.goBack()}
              />
            ) : (
              <Button
                title="Next"
                onPress={() => setCurrentStep(currentStep + 1)}
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {getLayout()}
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  containerImage: {
    alignItems: "center",
  },
  imageArea: {
    width: "80%",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    backgroundColor: "#e3dbd5",
  },
  fixToText: {
    justifyContent: "space-between",
    paddingTop: 30,
    paddingRight: 40,
    paddingLeft: 40,
  },
  starIcon: {
    paddingTop: 30,
    flexDirection: "row",
  },
  buttonLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "blue",
  },
  errorText: {
    color: "red",
  },
});
