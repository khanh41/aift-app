/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable, Text } from "react-native";
import BackButton from "../components/BackButton";
import LogoButton from "../components/Logo";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import {
  Dashboard,
  ForgotPasswordScreen,
  HomeScreen,
  LoginScreen,
  RegisterScreen,
} from "../screens";
import DoExerciseInprocessScreen from "../screens/DoExerciseInprocessScreen";
import DoExerciseInprocessScreenStream from "../screens/DoExerciseInprocessScreenStream";
import DoExerciseInprocessScreenVideo from "../screens/DoExerciseInprocessScreenVideo";
import DoExerciseStartScreen from "../screens/DoExerciseStartScreen";
import ExercisesScreen from "../screens/ExercisesScreen";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import ProfileInformation from "../screens/ProfileInformation";
import UserProfile from "../screens/UserProfile";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types/types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ProfileInformation"
        component={ProfileInformation}
        options={{ title: "Information" }}
      />

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />

      <Stack.Screen name="Modal" component={ModalScreen} />

      <Stack.Screen
        name="DoExerciseStart"
        component={DoExerciseStartScreen}
        options={({ route }: { route: any }) => ({
          title: route.params.name,
        })}
      />

      <Stack.Screen
        name="DoExerciseInprocess"
        component={DoExerciseInprocessScreen}
        options={{ title: "Upload Image" }}
      />

      <Stack.Screen
        name="DoExerciseInprocessVideo"
        component={DoExerciseInprocessScreenVideo}
        options={{ title: "Video" }}
      />

      <Stack.Screen
        name="DoExerciseInprocessStream"
        component={DoExerciseInprocessScreenStream}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Exercises"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Exercises"
        component={ExercisesScreen}
        options={({ navigation }: RootTabScreenProps<"Exercises">) => ({
          title: "Exercises",
          tabBarIcon: ({ color }) => <TabBarIcon name="fire" color={color} />,
          headerLeft: () => (
            <LogoButton goBack={() => navigation.navigate("Exercises")} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="UserProfile"
        component={UserProfile}
        options={({ navigation }: RootTabScreenProps<"UserProfile">) => ({
          title: "User",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerLeft: () => (
            <LogoButton goBack={() => navigation.navigate("Exercises")} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("ProfileInformation")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
