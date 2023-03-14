import { Provider } from "react-redux";

import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import { createContext } from "react";
import { useState } from "react";

import useRoute from "./router";
import { store } from "./redux/store";

export const isAuthContext = createContext(false);

export default function App() {
  // const [isAuth, setIsAuth] = useState(false);
  // console.log(isAuth, "context");

  // const toggleIsAuth = () => {
  //   setIsAuth(true);
  //   // setIsAuth((prevAuth) => (prevAuth === false ? true : false));
  // };

  const routing = useRoute(false);

  return (
    <>
      <Provider store={store}>
        {/* <isAuthContext.Provider value={{ isAuth, toggleIsAuth }}> */}
        <StatusBar style="auto" />
        <NavigationContainer>{routing}</NavigationContainer>
        {/* </isAuthContext.Provider> */}
      </Provider>
    </>
  );
}
