import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import RegistrationScreen from "./Screens/RegistrationScreen";
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <RegistrationScreen></RegistrationScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
