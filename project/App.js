import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import { useContext } from "react";

import useRoute from "./router";

import { IsAuthContext } from "./context";
import { isAuthContext } from "./context";

export default function App() {
  const { isAuth } = useContext(isAuthContext);
  const routing = useRoute(isAuth);
  console.log(isAuth, "isAuth");

  return (
    <>
      <IsAuthContext>
        <StatusBar style="auto" />
        <NavigationContainer>{routing}</NavigationContainer>
      </IsAuthContext>
    </>
  );
}
