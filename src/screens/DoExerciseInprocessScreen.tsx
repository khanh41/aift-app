import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Image,
  Text,
  Button,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { View } from "../components/Themed";
import { RootStackScreenProps } from "../types/types";
import * as ImagePicker from "expo-image-picker";
import { firebaseImageUrl, replaceText } from "../constants/API";
import { FontAwesome } from "@expo/vector-icons";
import StepIndicator from "react-native-step-indicator";
import ExerciseService from "../services/ExerciseService";
import ImageViewer from "react-native-image-zoom-viewer";
import UserService from "../services/UserService";

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

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      setErrorText("");
    }
  };

  const starComponent = (numStar: number) => {
    let starOutput = [];
    for (let index = 0; index < numStar; index++) {
      starOutput.push(<FontAwesome name="star" size={30} color="#d2e807" />);
    }

    for (let index = numStar; index < 5; index++) {
      starOutput.push(<FontAwesome name="star-o" size={30} color="#d2e807" />);
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
  const [visibleImage, setVisibleImage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let value = route.params.name;
  value = value.toLowerCase().split(" ").join("");
  const [imageUrl, setImageUrl] = useState(
    firebaseImageUrl.replace(replaceText, value + currentStep)
  );

  const predictForm = async () => {
    const nameStep = route.params.name;
    const exerciseCode =
      nameStep.replace(" ", "").toLowerCase() + currentStep.toString();
    try {
      const response = await ExerciseService.predictForm(
        exerciseCode,
        nameStep,
        pickedImagePath
      );
      if (response.status == 200) {
        return response.data.data;
      } else {
        setErrorText("Server is under maintain");
        setIsLoading(false);
      }
    } catch {
      setErrorText("Please clear cut image and right direction");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(false);
    setIsSubmit(true);
    setImageUrl(firebaseImageUrl.replace(replaceText, value + currentStep));
    console.log(imageUrl);
    setPickedImagePath("");
  }, [currentStep]);

  const showImageResult = () => {
    setVisibleImage(true);
  };

  const submitPress = async () => {
    if (pickedImagePath != "") {
      try {
        setIsLoading(true);
        setErrorText("");
        // Call api and get link image, number star
        const predicted_image = await predictForm();

        if (predicted_image != undefined) {
          await UserService.addHistoryImage(predicted_image?.image);
          setResultImage(
            firebaseImageUrl.replace(replaceText, predicted_image?.image)
          );
          setIsSubmit(false);
          setErrorText("");
          setNumStar(predicted_image?.score);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrorText("Please choose a image");
    }
  };

  const getLayout = () => {
    if (isSubmit)
      return (
        <View>
          <View style={styles.step}>
            <StepIndicator
              stepCount={numberStep}
              currentPosition={currentStep - 1}
            />
          </View>
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
            {isLoading && <ActivityIndicator size="large" color="#00ff00" />}

            {!isLoading && (
              <Button title="Submit" color="#6ec965" onPress={submitPress} />
            )}
          </View>
        </View>
      );

    return (
      <View>
        <View style={styles.containerImage}>
          <TouchableOpacity onPress={showImageResult}>
            <Image source={{ uri: resultImage }} style={styles.imageArea} />
          </TouchableOpacity>
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
      <Modal visible={visibleImage} transparent={true}>
        <ImageViewer
          imageUrls={[
            {
              url: resultImage,
            },
          ]}
          onCancel={() => setVisibleImage(false)}
          onSwipeDown={() => setVisibleImage(false)}
          enableSwipeDown
          enableImageZoom
        />
      </Modal>

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
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    backgroundColor: "#e3dbd5",
    resizeMode: "contain",
    aspectRatio: 1.7,
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
  step: {
    paddingBottom: 30,
  },
});
