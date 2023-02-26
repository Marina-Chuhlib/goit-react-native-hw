import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import useRoute from "./router";

export default function App() {
  const routing = useRoute({});

  return (
    <>
      <StatusBar style="auto" />

      <NavigationContainer>{routing}</NavigationContainer>
    </>
  );
}
