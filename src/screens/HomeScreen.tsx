import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { RootStackScreenProps } from "../types/types";

export default function HomeScreen({
  navigation,
}: RootStackScreenProps<"Root">) {
  return (
    <Background>
      <Logo />
      <Header>AI Fitness Trainer</Header>

      <Paragraph>Help you practice the right movements.</Paragraph>
      <Button mode="contained" onPress={() => navigation.navigate("Login")}>
        Login
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate("Register")}>
        Sign Up
      </Button>
    </Background>
  );
}
