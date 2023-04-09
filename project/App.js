import { Provider } from "react-redux";

import { StatusBar } from "expo-status-bar";

import { store } from "./redux/store";

import Main from "./components/Main";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <StatusBar style="auto" />
        <Main />
      </Provider>
    </>
  );
}
