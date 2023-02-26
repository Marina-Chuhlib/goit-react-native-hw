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


const PostsScreen = () => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>Posts Screen</Text>
      </View>
      <View style={styles.tabBarWrapper}></View> */}
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
 margin:15,
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
    marginTop:570,
    alignItems: "center",
    height: 88,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
});
