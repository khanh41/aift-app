import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Background from "../components/Background";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import {
  emailValidator,
  passwordValidator,
  nameValidator,
  confirmPasswordValidator,
} from "../core/utils";
import { RootStackScreenProps } from "../types/types";
import { Logo } from "../components/Images";
import AuthService from "../services/AuthService";

export default function RegisterScreen({
  navigation,
}: RootStackScreenProps<"Register">) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });
  const [password, setPassword] = useState({ value: "", error: "" });

  const _onSignUpPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const confirmPasswordError = confirmPasswordValidator(
      password.value,
      confirmPassword.value
    );

    if (emailError || passwordError || confirmPasswordError) {
      setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    await AuthService.register(email.value, password.value);
    // await AuthService.login(email.value, password.value)

    navigation.navigate("BottomTabNavigator");
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("Root")} />

      <Logo />

      <Header>Create Account</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoComplete="off"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        autoComplete="off"
        secureTextEntry
      />

      <TextInput
        label="Confirm Password"
        returnKeyType="done"
        value={confirmPassword.value}
        onChangeText={(text) => setConfirmPassword({ value: text, error: "" })}
        error={!!confirmPassword.error}
        errorText={confirmPassword.error}
        autoComplete="off"
        secureTextEntry
      />

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
