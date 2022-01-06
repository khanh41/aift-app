import React from "react";
import Background from "../components/Background";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { RootStackScreenProps } from "../types/types";
import { Logo } from "../components/Images";

export default function Dashboard({
  navigation,
}: RootStackScreenProps<"BottomTabNavigator">) {
  return (
    <Background>
      <Logo />

      <Header>Let's start</Header>

      <Paragraph>
        Your amazing app starts here. Open you favourite code editor and start
        editing this project.
      </Paragraph>

      <Button mode="contained" onPress={() => navigation.navigate("Root")}>
        Logout
      </Button>

      <Button mode="outlined" onPress={() => navigation.navigate("Root")}>
        Logout
      </Button>
    </Background>
  );
}
