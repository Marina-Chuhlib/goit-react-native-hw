import {
  StyleSheet,
  TextInput,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const ProfileScreen = ({ route }) => {
  return (

    <View>
      <Text style={styles.headerText}></Text>
      {/* <Text>{route.name}</Text> */}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    //   justifyContent: "flex-end",
  },
  headerWrapper: {
    justifyContent: "flex-end",
    alignItems: "center",
    height: 88,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  headerText: {
    marginBottom: 11,
    fontSize: 17,
  },
  tabBarWrapper: {
    marginTop: 570,
    alignItems: "center",
    height: 88,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
});
