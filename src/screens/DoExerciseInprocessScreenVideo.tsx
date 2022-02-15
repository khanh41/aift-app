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
  Dimensions,
} from "react-native";
import { View } from "../components/Themed";
import { RootStackScreenProps } from "../types/types";
import * as ImagePicker from "expo-image-picker";
import { firebaseImageUrl, replaceText, videoUrl } from "../constants/API";
import ExerciseService from "../services/ExerciseService";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";

export default function DoExerciseInprocessScreenVideo({
  route,
  navigation,
}: RootStackScreenProps<"DoExerciseInprocessVideo">) {
  const showImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      setErrorText("");
    }
  };

  const [pickedImagePath, setPickedImagePath] = useState<string>("");
  const [isSubmit, setIsSubmit] = useState<boolean>(true);
  const [errorText, setErrorText] = useState<string>("");
  const [resultVideo, setResultVideo] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let value = route.params.name;
  value = value.toLowerCase().split(" ").join("");
  const [imageUrl, setImageUrl] = useState(
    firebaseImageUrl.replace(replaceText, value)
  );

  const predictForm = async (nameStep: string) => {
    const response = await ExerciseService.predictVideo(
      nameStep,
      pickedImagePath
    );
    return response.data.data;
  };

  useEffect(() => {
    setIsSubmit(true);
    setPickedImagePath("");
  }, []);

  const submitPress = async () => {
    if (pickedImagePath != "") {
      try {
        setIsLoading(true);
        // Call api and get link image, number star
        const video_id: string = await predictForm(route.params.name);
        setResultVideo(video_id);
        console.log(resultVideo);

        setIsSubmit(false);
        setErrorText("");
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    } else {
      setErrorText("Please choose a video");
    }
  };

  function setOrientation() {
    if (Dimensions.get("window").height > Dimensions.get("window").width) {
      //Device is in portrait mode, rotate to landscape mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      //Device is in landscape mode, rotate to portrait mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }

  const getLayout = () => {
    if (isSubmit)
      return (
        <View>
          <View style={styles.containerImage}>
            <Image source={{ uri: imageUrl }} style={styles.imageArea} />
            <Text style={{ paddingTop: 20 }}>Your Video:</Text>

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
                <Text style={styles.buttonLabel}>Choose Video</Text>
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

    console.log(`${videoUrl}${resultVideo}`);

    return (
      <View style={styles.container2}>
        <Video
          source={{
            uri: `${videoUrl}${resultVideo}`,
          }}
          rate={1.0}
          volume={1.0}
          isMuted={true}
          useNativeControls
          onFullscreenUpdate={setOrientation}
          resizeMode="cover"
          style={{ width: Dimensions.get("window").width, height: 200 }}
        />
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
  container2: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
