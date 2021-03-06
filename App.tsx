import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./src/hooks/useCachedResources";
import Navigation from "./src/navigation";
import { ModalPortal } from "react-native-modals";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <ModalPortal />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
