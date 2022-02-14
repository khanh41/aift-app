/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IExercise } from "./ResponseType";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  // Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Root: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  BottomTabNavigator: undefined;
  Modal: undefined;
  NotFound: undefined;
  DoExerciseStart: IExercise;
  DoExerciseInprocess: {
    name: string;
    numberStep: number;
    currentStep: number;
  };
  DoExerciseInprocessVideo: {
    name: string;
  };
  DoExerciseInprocessStream: {
    name: string;
  };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Exercises: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type NavigationRoute = {
  Detail: {
    name: string;
  };
};
