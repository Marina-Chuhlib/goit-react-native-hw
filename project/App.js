import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import { useContext } from "react";

import useRoute from "./router";

import { IsAuthContext } from "./context";
import { isAuthContext } from "./context";

export default function App() {
  const isAuth = useContext(isAuthContext);
  console.log(isAuth);

  const routing = useRoute(isAuth);
  return (
    <>
      <StatusBar style="auto" />
      <IsAuthContext>
        <NavigationContainer>{routing}</NavigationContainer>
      </IsAuthContext>
    </>
  );
}
