import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  RefreshControl,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

import { Text, View } from "../components/Themed";
import { firebaseImageUrl, replaceText } from "../constants/API";
import UserService from "../services/UserService";
import { RootStackScreenProps } from "../types/types";

interface IShowZoom {
  url: string;
}

export default function UserProfile({
  navigation,
}: RootStackScreenProps<"ProfileInformation">) {
  const value =
    "https://quatangme.com/upload/images/he-lo-top-10-girl-xinh-van-nguoi-me.jpg";

  const [listImage, setListImage] = useState<Array<string>>([]);
  const [listShowZoom, setListZoom] = useState<any>([]);

  const [userImage, setUserImage] = useState(value);
  const [visibleImage, setVisibleImage] = useState<boolean>(false);
  const [indexImage, setIndexImage] = useState(0);
  const [refreshing, setRefreshing] = useState(true);

  const getHistoryImage = async () => {
    const response = await UserService.getHistoryImage();
    const images = response.data.data;

    let temp_images_url = [];
    let temp_images_show_zoom_url = [];
    for (let index = 0; index < images.length; index++) {
      const element: string = firebaseImageUrl.replace(
        replaceText,
        images[index]
      );
      temp_images_url.push(element);
      temp_images_show_zoom_url.push({ url: element });
    }

    setListImage(temp_images_url);
    setListZoom(temp_images_show_zoom_url);
    setRefreshing(false);
  };

  const onRefresh = () => {
    setListImage([]);
    setListZoom([]);
    getHistoryImage();
  };

  useEffect(() => {
    getHistoryImage();
  }, []);

  const changImage = async () => {
    // API change image
    // return response.data.data;
  };

  const onPressZoomImage = (index: React.SetStateAction<number>) => {
    setIndexImage(index);
    setVisibleImage(true);
  };

  const imagePost = (image: string) => {
    return <Image source={{ uri: image }} style={styles.postImage} />;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => changImage()} style={styles.coverImage}>
        <Image source={{ uri: userImage }} style={styles.imageProfile} />
      </TouchableOpacity>
      <Text style={styles.title}>Khánh Pluto</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.row}>
          {listImage.map((value: string) => (
            <TouchableOpacity
              key={value}
              onPress={() => onPressZoomImage(listImage.indexOf(value))}
            >
              {imagePost(value)}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Modal visible={visibleImage} transparent={true}>
        <ImageViewer
          imageUrls={listShowZoom}
          index={indexImage}
          onCancel={() => setVisibleImage(false)}
          onSwipeDown={() => setVisibleImage(false)}
          enableSwipeDown
          enableImageZoom
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  coverImage: {
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#1693e0",
  },
  imageProfile: {
    borderRadius: 100,
    height: Dimensions.get("window").width / 4,
    width: Dimensions.get("window").width / 4,
    resizeMode: "stretch",
  },
  postImage: {
    margin: 3,
    height: Dimensions.get("window").width / 2,
    width: Dimensions.get("window").width / 3.16,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  title: {
    fontSize: 20,
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: "90%",
  },
});
