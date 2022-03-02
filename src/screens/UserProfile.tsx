import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types/types";

export default function UserProfile({
  navigation,
}: RootStackScreenProps<"ProfileInformation">) {
  const value =
    "https://quatangme.com/upload/images/he-lo-top-10-girl-xinh-van-nguoi-me.jpg";

  const listImage = [
    "https://recmiennam.com/wp-content/uploads/2020/10/tuyen-tap-bo-anh-girl-xinh-dep-nhat-nam-2020-15.jpg",
    "https://itcafe.vn/wp-content/uploads/2021/01/anh-gai-xinh-3.jpg",
    "https://hinhnen123.com/wp-content/uploads/2021/06/Tron-bo-99-hinh-anh-gai-xinh-va-quyen-ru-nhat-hien-nay.jpg",
    "https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg",
    "https://thuthuatnhanh.com/wp-content/uploads/2019/05/gai-xinh-toc-ngan-facebook.jpg",
    "https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-1-480x600.jpg",
    "https://kenh14cdn.com/2019/9/27/566226151661511044021668004432122225985389n-1569234596911848541502-1569517951952686128625.jpg",
    "https://1.bp.blogspot.com/-wIaKEkcCTTk/XqjcK5-2a8I/AAAAAAAAk4k/opJSFhhMK2MXq51T3fXX8TaMUSW78alSgCEwYBhgL/s1600/hinh-nen-girl-xinh-4k-nu-cuoi-xinh-xan.jpg",
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5eeea355389655.59822ff824b72.gif",
  ];
  const listShowZoom = [];
  for (let index = 0; index < listImage.length; index++) {
    const element = listImage[index];
    listShowZoom.push({ url: element });
  }

  const [userImage, setUserImage] = useState(value);
  const [visibleImage, setVisibleImage] = useState<boolean>(false);
  const [indexImage, setIndexImage] = useState(0);

  const changImage = async () => {
    // API change image
    // const response = await
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
      <ScrollView>
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
