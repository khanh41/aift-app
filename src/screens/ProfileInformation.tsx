import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import Modal, {
  SlideAnimation,
  ModalContent,
  ModalButton,
  ModalFooter,
  ModalTitle,
} from "react-native-modals";
import { IProfileInfomation } from "../types";

export default function ProfileInformation() {
  const [editing, setEditing] = useState(false);
  const [textEditing, setTextEditing] = useState<string | number>("");
  const [modalTitle, setModalTitle] = useState("");
  const [dictValue, setDictValue] = useState<IProfileInfomation>({
    Name: "",
    Age: 0,
    Height: 0,
    PhoneNumber: "123",
    Weight: 0,
  });

  const saveEdit = () => {
    let temp = dictValue;
    temp[modalTitle] = textEditing;
    setDictValue(temp);
    setEditing(false);
  };

  const showModel = (
    editModalTitle: string,
    editTextEditing: string | number
  ) => {
    setEditing(true);
    setModalTitle(editModalTitle);
    setTextEditing(editTextEditing);
  };

  const lineTextComponent = () => {
    let temp = [];
    for (const key in dictValue) {
      temp.push(
        <>
          <TouchableOpacity
            key={key}
            onPress={() => {
              showModel(key, dictValue[key]);
            }}
          >
            <View style={styles.row}>
              <Text>{key}</Text>
              <Text style={styles.textValue}>
                {dictValue[key]} {"✎"}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
        </>
      );
    }
    return temp;
  };

  return (
    <View style={styles.container}>
      {lineTextComponent()}
      <Modal
        onDismiss={() => {
          setEditing(false);
        }}
        width={0.9}
        overlayOpacity={0.4}
        visible={editing}
        rounded
        onSwipeOut={() => {
          setEditing(false);
        }}
        onTouchOutside={() => {
          setEditing(false);
        }}
        swipeDirection={["down", "up"]}
        modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
        modalTitle={<ModalTitle title={modalTitle} />}
        footer={
          <ModalFooter>
            <ModalButton
              text="Cancle"
              bordered
              onPress={() => {
                setEditing(false);
              }}
              key="button-1"
            />
            <ModalButton
              text="Save"
              bordered
              onPress={() => {
                saveEdit();
              }}
              key="button-2"
            />
          </ModalFooter>
        }
      >
        <ModalContent style={{ backgroundColor: "#fff", paddingTop: 24 }}>
          {typeof dictValue[modalTitle] === "number" ? (
            <TextInput
              style={styles.input}
              onChangeText={setTextEditing}
              value={textEditing.toString()}
              keyboardType="numeric"
            />
          ) : (
            <TextInput
              style={styles.input}
              onChangeText={setTextEditing}
              value={textEditing}
            />
          )}

          <Text></Text>
        </ModalContent>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: "100%",
  },
  textValue: {
    color: "#d6d4ce",
    flex: 1,
    textAlign: "right",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
